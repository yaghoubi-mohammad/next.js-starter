import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import VerifyLoginForm from "./verify-login-form";

export default async function VerifyLoginPage({
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
    <VerifyLoginForm
      phoneNumber={phoneNumber}
      initialError={searchParams.error}
    />
  );
}
