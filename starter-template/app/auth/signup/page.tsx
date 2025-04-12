import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignupForm from "./signup-form";

export default async function SignupPage({
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
    <SignupForm phoneNumber={phoneNumber} initialError={searchParams.error} />
  );
}
