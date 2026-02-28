'use client';

import { useRouter } from 'next/navigation';
import { Star, MessageSquare } from 'lucide-react';

const ReviewsButton = () => {
  const router = useRouter();

  return (
    /* Fixed Reviews Button */
    <button
      onClick={() => router.push('/reviews')}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 group"
    >
      <MessageSquare className="w-5 h-5" />
      <span className="font-semibold">Reviews</span>
      <div className="flex items-center gap-1 ml-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      </div>
    </button>
  );
};

export default ReviewsButton;
