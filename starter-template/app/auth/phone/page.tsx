import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PhoneForm from "./phone-form";

export default async function PhonePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return <PhoneForm initialError={searchParams.error} />;
}