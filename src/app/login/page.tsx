"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";
import startsWith from "lodash.startswith";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";

export default function Home() {
  console.log("chang");
  const [value, setValue] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<CountryData>();
  const [verificationCode, setVerificationCode] = useState<
    string | undefined
  >();
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    if ((verificationCode?.length || 0) === 5) {
      // verify code post call
      setVerifying(true);
      setTimeout(() => {
        setVerifying(false);
        setIsVerified(true);
      }, 2000);
    }
  }, [verificationCode]);

  const { login, isLoading, loginSuccess } = useLogin();

  const isValidPhoneNumber = useCallback(() => {
    const phoneLength = value?.length || 0;
    const validLength =
      (selectedCountry?.format?.match(/\./g)?.length || 0) === phoneLength;
    const isValid =
      validLength &&
      selectedCountry &&
      value?.startsWith(selectedCountry?.dialCode);
    return isValid;
  }, [selectedCountry, value]);

  const onLoginClick = () => {
    value && isValid && login(value);
  };

  const isValid = isValidPhoneNumber();

  return (
    <div className="min-h-screen flex flex-col items-center pt-52">
      <Heading as="h3">Login or Sign up</Heading>
      <div className="mt-4 flex items-center flex-col">
        <PhoneInput
          country={selectedCountry?.countryCode || "us"}
          value={value}
          onChange={(e, country: CountryData) => {
            if (country.countryCode !== selectedCountry?.countryCode) {
              setSelectedCountry(country);
            }
            setValue(e);
          }}
          onEnterKeyPress={onLoginClick}
          inputStyle={{ width: "225px" }}
          isValid={(inputNumber, country, countries: object[]) => {
            return countries.some((country: object) => {
              return (
                startsWith(
                  inputNumber,
                  (country as { dialCode: string }).dialCode,
                ) ||
                startsWith(
                  (country as { dialCode: string }).dialCode,
                  inputNumber,
                )
              );
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-y-5 mt-2 items-center">
        <div className={cn("text-xs", { invisible: !isValid })}>
          We will send a verification code to this number.
        </div>
        {loginSuccess ? (
          <div className="flex flex-col items-center">
            <span>Verification Code</span>
            <div className="flex items-center relative">
              <Input
                value={verificationCode}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    setVerificationCode(
                      verificationCode?.slice(0, verificationCode.length - 1),
                    );
                  } else if (
                    (verificationCode?.length || 0) < 5 &&
                    e.key >= "0" &&
                    e.key <= "9"
                  ) {
                    setVerificationCode((verificationCode || "") + e.key);
                  }
                }}
                className={{ root: "w-32 mt-1", input: "text-center" }}
                autoFocus
                inputType="number"
              />
              {verifying && (
                <Loader className={cn("animate-spin absolute right-2")} />
              )}
              {isVerified && (
                <Check className="text-green-400 absolute right-2" />
              )}
            </div>
            {isVerified && (
              <Link href="/">
                <Button className="mt-4" variant="secondary">
                  Accept TOS
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <Button onClick={onLoginClick} className="w-32" disabled={!isValid}>
            {isLoading ? "Sending Code..." : "Login"}
          </Button>
        )}
      </div>
    </div>
  );
}
