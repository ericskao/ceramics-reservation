"use client";

import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import signUp from "@/firebase/signup";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent } from "react";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push("/admin");
  };

  return (
    <div className="flex flex-col flex-1 items-center pt-[10%]">
      <div className="flex flex-col">
        <Heading as="h3">Sign Up</Heading>
        <form onSubmit={handleForm} className="flex flex-col gap-y-2">
          <Input
            defaultValue="example@mail.com"
            autoFocus
            inputRequired
            value={email}
            onInputChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setEmail(e.target.value)}
            labelText="E-mail"
          />
          <Input
            defaultValue="example@mail.com"
            inputRequired
            value={password}
            onInputChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setPassword(e.target.value)}
            labelText="Password"
          />
          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
