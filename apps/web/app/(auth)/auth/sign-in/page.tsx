import { Metadata } from "next";

import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Sign-in Page",
  description: "Login to your account",
};

export default function SignInPage() {
  return <SignInForm />;
}
