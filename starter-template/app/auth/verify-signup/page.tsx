import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import VerifySignupForm from "./verify-signup-form";

export default async function VerifySignupPage({
  searchParams,
}: {
  searchParams: { phone?: string; error?: string };
}) {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const phoneNumber = searchParams.phone;
  if (!phoneNumber) {
    redirect("/auth/phone");
  }

  return (
    <VerifySignupForm
      phoneNumber={phoneNumber}
      initialError={searchParams.error}
    />
  );
}
