import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import startsWith from "lodash.startswith";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";

import apiClient from "@/api/apiClient";
import "react-phone-input-2/lib/style.css";

const Login = () => {
  const [value, setValue] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<CountryData>();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  useEffect(() => {
    console.log("setVerificationCode in useEffect: ", verificationCode);
    if (verificationCode.length === 6) {
      setErrorMessage("");
      setVerifying(true);
      apiClient
        .post("http://localhost:3000/api/v1/login", { code: verificationCode })
        .then((response) => {
          setVerifying(false);
          setIsVerified(true);
          Cookies.set("token", response.data.token, {
            expires: 7,
            secure: true,
          });
          Cookies.set("user", JSON.stringify(response.data.user), {
            expires: 7,
            secure: true,
          });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else if (verificationCode.length > 6) {
      console.log("setErrorMessage in useEffect: ", verificationCode);
      setErrorMessage("Verification code must be 6 digits");
    }
  }, [verificationCode]);

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

  const onLoginClick = useCallback(() => {
    if (value) {
      setIsLoading(true);
      apiClient
        .post("http://localhost:3000/api/v1/send_auth_code", {
          phone_number: value,
        })
        .then((response) => {
          setIsLoading(false);
          setLoginSuccess(true);
        })
        .catch((error) => {
          console.log("end auth code response error: ", error);
        });
    }
  }, [value]); // Added dependencies array

  const isValid = isValidPhoneNumber();
  return (
    <div>
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
                onInputChange={(e) => setVerificationCode(e.target.value)}
                className={{ root: "w-32 mt-1", input: "text-center" }}
                autoFocus
                maxLength={6}
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
};

export default Login;
