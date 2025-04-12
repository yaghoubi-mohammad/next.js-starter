"use client";

import { resendCodeAction, verifySignupAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifySignupForm({
  phoneNumber,
  initialError,
}: {
  phoneNumber: string;
  initialError?: string;
}) {
  const [code, setCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(90);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendDisabled && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime <= 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, remainingTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await verifySignupAction(phoneNumber, code);
      if (result.redirect) {
        router.push(result.redirect);
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  const handleResendCode = async () => {
    startTransition(async () => {
      const result = await resendCodeAction(phoneNumber);
      if (result.success) {
        toast.success(result.success);
        setRemainingTime(90);
        setIsResendDisabled(true);
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="md:grid md:grid-cols-2 w-full h-full">
        <div className="relative z-20 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 md:backdrop-blur-none md:bg-transparent flex justify-center items-center min-h-[calc(100vh-100px)] md:min-h-full p-4 md:p-0">
          <Card className="w-full max-w-md shadow-xl md:shadow-none md:mx-8 lg:mx-0">
            <CardHeader>
              <div className="flex flex-col gap-5">
                <div className="p-4 rounded-full bg-octa-base-100/10 text-octa-base-1 w-fit mx-auto">
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <CardTitle className="text-center text-xl md:text-2xl font-bold">
                  تکمیل ثبت‌نام
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium">
                    کد تأیید
                  </label>
                  <InputOTP
                    maxLength={4}
                    value={code}
                    onChange={setCode}
                    disabled={isPending}
                  >
                    <InputOTPGroup className="gap-2" dir="ltr">
                      {[0, 1, 2, 3].map((index) => (
                        <>
                          <InputOTPSlot
                            index={index}
                            className="size-16"
                            key={index}
                          />
                          {index === 1 && <InputOTPSeparator />}
                        </>
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {initialError && (
                  <p className="text-sm text-red-600">{initialError}</p>
                )}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(remainingTime / 60)}:
                      {(remainingTime % 60).toString().padStart(2, "0")}
                    </span>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendCode}
                      disabled={isResendDisabled || isPending}
                      className="p-0 h-auto"
                    >
                      ارسال مجدد کد
                    </Button>
                  </div>
                  <Progress
                    value={(remainingTime / 90) * 100}
                    className="h-2"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "در حال تأیید..." : "تأید و ثبت‌نام"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="absolute bottom-4 md:hidden text-center text-sm text-white/80 hover:text-white">
            <Link
              href="https://octavia.ir"
              target="_blank"
              className="hover:text-octa-base-1"
            >
              Powered by OctaviaTech
            </Link>
          </div>
        </div>
        <div className="fixed md:relative inset-0 -z-10 md:z-0 md:h-full">
          <div className="relative w-full h-full">
            <Image
              src="https://s3.octavia.ir/octavia-tech/auth/ibg-auth.webp"
              alt="Background"
              className="w-full h-full object-cover object-center"
              fill
              priority
              quality={80}
            />
            <div className="hidden md:flex absolute top-0 left-0 flex-col gap-3 items-center justify-center w-full h-full z-10">
              <Image
                src="https://s3.octavia.ir/octavia-tech/logo-dark.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-1/4 h-auto animate-fade-in"
              />
              <p className="text-white text-lg md:text-xl font-bold animate-slide-up">
                - رزرو نوبت آنلاین -
              </p>
            </div>
            <div className="hidden md:flex absolute bottom-5 left-0 w-full z-10 justify-center text-white/80 hover:text-white text-sm transition-colors">
              <Link href="https://octavia.ir" target="_blank">
                Powered by OctaviaTech
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
