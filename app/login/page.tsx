"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/lib/api/woocommerce.client";
import { toast } from "sonner";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", username: "", first_name: "", last_name: "" });
  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await registerUser({ email: form.email, password: form.password, username: form.username, first_name: form.first_name, last_name: form.last_name });
        toast.success("Account created successfully!");
      } else {
        await loginUser({ username: form.email, password: form.password });
        toast.success("Welcome back!");
      }
      router.push("/account");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-lg border border-border bg-card p-8">
        <h1 className="mb-2 text-center font-display text-2xl font-bold text-foreground">{isRegister ? "Create Account" : "Sign In"}</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">{isRegister ? "Join CDKeyVast for the best deals" : "Access your account and orders"}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="grid grid-cols-2 gap-3">
              <div><label className="mb-1 block text-xs text-muted-foreground">First Name</label><input required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              <div><label className="mb-1 block text-xs text-muted-foreground">Last Name</label><input required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            </div>
          )}
          {isRegister && (
            <div><label className="mb-1 block text-xs text-muted-foreground">Username</label><input required value={form.username} onChange={(e) => update("username", e.target.value)} className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          )}
          <div><label className="mb-1 block text-xs text-muted-foreground">Email</label><input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div><label className="mb-1 block text-xs text-muted-foreground">Password</label><input type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:neon-glow disabled:opacity-50">
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="font-medium text-primary hover:text-primary/80">{isRegister ? "Sign In" : "Register"}</button>
        </p>
      </motion.div>
    </div>
  );
}
