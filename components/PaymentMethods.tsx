const PaymentMethods = () => {
  return (
    <div className="border-b border-border py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 px-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Payment Methods We Accept:
        </span>
        {["VISA", "MasterCard", "PayPal", "Discover"].map((method) => (
          <span
            key={method}
            className="rounded border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
