# WordPress/Server Optimization for High-Frequency API Requests

## PHP Configuration (php.ini)

Add these settings to your PHP configuration to handle high-frequency API requests:

```ini
; Increase memory limit for API processing
memory_limit = 512M

; Increase execution time for batch operations
max_execution_time = 300
max_input_time = 300

; Increase POST size for large API requests
post_max_size = 100M
upload_max_filesize = 100M

; OPCache settings for better performance
opcache.enable = 1
opcache.memory_consumption = 256
opcache.interned_strings_buffer = 8
opcache.max_accelerated_files = 10000
opcache.revalidate_freq = 0
opcache.validate_timestamps = 0
opcache.save_comments = 1
opcache.load_comments = 1

; Allow more concurrent connections
max_children = 20
start_servers = 5
min_spare_servers = 5
max_spare_servers = 10
max_requests = 500
```

## WordPress Configuration (wp-config.php)

Add these constants to optimize WordPress for API usage:

```php
// Disable unnecessary features during build time
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// Increase memory limit
define('WP_MEMORY_LIMIT', '512M');

// Disable cron during build to prevent interference
define('DISABLE_WP_CRON', true);

// Optimize database queries
define('WP_POST_REVISIONS', 3);
define('EMPTY_TRASH_DAYS', 7);

// Cache settings
define('WP_CACHE', true);
define('OBJECT_CACHE', true);

// Reduce heartbeat frequency
add_filter('heartbeat_settings', function($settings) {
    $settings['interval'] = 60; // 60 seconds instead of default 15
    return $settings;
});
```

## Nginx/Apache Configuration

### Nginx Configuration

```nginx
# Increase client timeouts for long-running API requests
client_body_timeout 300s;
client_header_timeout 300s;
keepalive_timeout 300s;
send_timeout 300s;

# Rate limiting - adjust based on your server capacity
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=build:10m rate=5r/s;

# Apply rate limiting to WooCommerce API
location ~ ^/wp-json/wc/v3/ {
    limit_req zone=api burst=20 nodelay;
    try_files $uri $uri/ /index.php?$args;
}

# Special handling for build-time requests (if you can identify them)
location ~ ^/wp-json/wc/v3/products {
    limit_req zone=build burst=10 nodelay;
    try_files $uri $uri/ /index.php?$args;
}
```

### Apache Configuration

```apache
# Increase timeouts
Timeout 300
ProxyTimeout 300

# Rate limiting with mod_reqtimeout (if available)
RequestReadTimeout header=20-40,MinRate=500 body=20,MinRate=500

# Enable caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType application/json "access plus 60 seconds"
</IfModule>
```

## Database Optimization

```sql
-- Add indexes for WooCommerce API performance
CREATE INDEX idx_products_status ON wp_posts(post_status);
CREATE INDEX idx_products_type_status ON wp_posts(post_type, post_status);
CREATE INDEX idx_postmeta_product_id ON wp_postmeta(post_id);
CREATE INDEX idx_postmeta_key_value ON wp_postmeta(meta_key, meta_value);

-- Optimize for product queries
CREATE INDEX idx_products_category ON wp_term_relationships(object_id, term_taxonomy_id);
```

## WooCommerce-Specific Optimizations

Add this to your theme's `functions.php` or a custom plugin:

```php
<?php
// Disable unnecessary features during API requests
add_action('rest_api_init', function() {
    // Disable WordPress heartbeat during API requests
    remove_action('admin_enqueue_scripts', 'wp_enqueue_heartbeat_scripts');
    
    // Disable admin notices for API requests
    remove_action('admin_notices', 'update_nag', 3);
    remove_action('admin_notices', 'maintenance_nag');
});

// Optimize WooCommerce API queries
add_filter('woocommerce_rest_product_query', function($args, $request) {
    // Limit fields returned to reduce payload
    if (!$request->get_param('fields')) {
        $args['fields'] = 'id,name,slug,price,regular_price,sale_price,on_sale,images,categories,attributes,stock_status,average_rating,rating_count,sku,tags';
    }
    
    // Increase per_page limit for efficiency
    $per_page = $request->get_param('per_page');
    if (!$per_page || $per_page < 100) {
        $args['per_page'] = 100;
    }
    
    return $args;
}, 10, 2);

// Cache API responses
add_action('rest_api_init', function() {
    // Enable REST API caching
    if (!defined('WP_REST_CACHE')) {
        define('WP_REST_CACHE', true);
    }
});

// Disable transients cleanup during build
add_filter('delete_expired_transients', '__return_false');

// Optimize image serving
add_filter('woocommerce_rest_prepare_product_object', function($response, $product) {
    // Remove unnecessary image sizes
    if (isset($response->data['images'])) {
        $response->data['images'] = array_map(function($image) {
            return [
                'id' => $image['id'],
                'src' => $image['src'],
                'alt' => $image['alt'] ?? '',
            ];
        }, $response->data['images']);
    }
    return $response;
}, 10, 2);
```

## Server-Side Caching

### Redis/Memcached Configuration

```php
// wp-config.php
define('WP_REDIS_HOST', '127.0.0.1');
define('WP_REDIS_PORT', 6379);
define('WP_REDIS_DATABASE', 0);
define('WP_REDIS_PREFIX', 'wc_api_');
define('WP_REDIS_MAXTTL', 86400);
```

### Object Cache Setup

```php
// Install and configure Redis object cache
// Plugin: Redis Object Cache
// Configure with long TTL for product data
```

## Monitoring and Logging

```php
// Add API request logging
add_action('rest_api_init', function() {
    add_filter('rest_post_dispatch', function($response, $server, $request) {
        if (strpos($request->get_route(), '/wc/v3/') !== false) {
            error_log(sprintf(
                'WC API: %s %s - Status: %d - Time: %.2fs',
                $request->get_method(),
                $request->get_route(),
                $response->get_status(),
                microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']
            ));
        }
        return $response;
    }, 10, 3);
});
```

## Build-Time Specific Settings

Create a build-specific configuration:

```php
// detect build mode via custom header or IP
if (isset($_SERVER['HTTP_X_BUILD_MODE']) && $_SERVER['HTTP_X_BUILD_MODE'] === 'true') {
    // Aggressive caching during build
    define('WP_CACHE', true);
    define('WP_REDIS_MAXTTL', 3600); // 1 hour cache
    
    // Disable non-essential features
    add_filter('wp_enqueue_scripts', '__return_false');
    add_filter('wp_print_styles', '__return_false');
    add_filter('wp_print_scripts', '__return_false');
    
    // Increase API rate limits
    add_filter('woocommerce_rest_api_limit', function($limit) {
        return 1000; // Very high limit for build
    });
}
```

## Firewall (WAF) Configuration

If using Cloudflare or similar WAF:

1. **Rate Limiting Rules**:
   - API endpoints: 100 requests/minute per IP
   - Build mode: 500 requests/minute per IP
   - Normal traffic: 30 requests/minute per IP

2. **Bot Protection**:
   - Whitelist your build server IP
   - Enable "Rate Limiting" for API endpoints
   - Disable "Challenge Passage" for known build IPs

3. **Caching Rules**:
   - Cache API responses for 60 seconds
   - Respect query string for cache variations
   - Enable "Browser Cache TTL" for API responses

## Testing the Optimizations

```bash
# Test API performance
curl -w "@curl-format.txt" -H "X-Build-Mode: true" \
  "https://your-site.com/wp-json/wc/v3/products?per_page=100"

# Monitor server resources
htop
iostat -x 1
mysqladmin processlist
```

## Emergency Measures

If you're still getting 503 errors during build:

1. **Temporary disable competing services**:
   ```bash
   # Disable WordPress cron
   wp cron event list --allow-root
   wp cron event delete --all --allow-root
   
   # Disable heavy plugins temporarily
   wp plugin deactivate heavy-plugin --allow-root
   ```

2. **Increase server resources**:
   - Scale up PHP workers
   - Increase database connections
   - Add more memory to PHP

3. **Use sequential build**:
   ```bash
   npm run build:sequential
   ```
