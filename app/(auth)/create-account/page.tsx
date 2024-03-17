"use client";

import FormButton from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Input from "@/components/input";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors.password}
          minLength={8}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={state?.fieldErrors.confirmPassword}
          minLength={8}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
