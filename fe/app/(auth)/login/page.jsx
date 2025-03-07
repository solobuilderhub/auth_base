"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components/auth/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";

import { login } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [state, formAction] = useActionState(login, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (formData) => {
    setEmail(formData.get("email"));
    formAction(formData);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold ">Sign In</h3>
        <p className="text-sm  ">Use your email and password to sign in</p>
      </div>
      <AuthForm action={handleSubmit} defaultEmail={email}>
        <SubmitButton>Sign in</SubmitButton>
        <div className="mt-6 text-center space-y-2">
          <Link href="/register" className="block text-sm  ">
            Don&apos;t have an account? Sign up
          </Link>
          <Link href="/forgot-password" className="block text-sm   ">
            Forgot your password?
          </Link>
        </div>
      </AuthForm>
    </div>
  );
}
