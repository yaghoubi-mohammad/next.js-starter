import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PasswordForm from "./password-form";

export default async function PasswordPage({
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
    <PasswordForm phoneNumber={phoneNumber} initialError={searchParams.error} />
  );
}
