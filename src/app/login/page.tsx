"use client";

import startsWith from "lodash.startswith";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";

// function CustomInputComponent(props: InputHTMLAttributes<HTMLInputElement>) {
//   return <input className='' type="tel" pattern="[0-9]*" {...props} />;
// }

export default function Home() {
  const [value, setValue] = useState<string | undefined>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [country, setCountry] = useState<{ countryCode: string }>();

  return (
    <div className="min-h-screen flex flex-col items-center pt-52">
      <div>Log in or Sign up</div>
      <div className="mt-4">
        <PhoneInput
          country={country?.countryCode || "us"}
          value={value}
          onChange={(e, country) => {
            console.log("e", e, country);
            setValue(e);
          }}
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
    </div>
  );
}
