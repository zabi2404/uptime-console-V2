import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  confirmSignUp,
  fetchUserAttributes,
  resendSignUpCode,
  signIn,
} from "aws-amplify/auth";
import React, { useState } from "react";

interface ConfirmationFormProps {
  email: string;
  password: string;
}
function ConfirmationForm({ email, password }: ConfirmationFormProps) {
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const client = generateClient<Schema>();

  const handleConfirmForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      await signIn({
        username: email,
        password: password,
      });

      const attributes = await fetchUserAttributes();

      await client.models.UserProfile.create({
        name: attributes.name || "",
        email: attributes.email || "",
      } as never);

      localStorage.removeItem("stage");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({
        username: email,
      });

      console.log("Confirmation code sent again");
    } catch (error) {
      console.error("Failed to resend code:", error);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Confirm your account
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Please check your email for the confirmation code.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleConfirmForm}>
        {/* Confirmation Code */}
        <div>
          <label
            htmlFor="confirmationCode"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Confirmation Code
          </label>

          <input
            id="confirmationCode"
            name="confirmationCode"
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Enter the code"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#1B76E2] focus:ring-2 focus:ring-[#1B76E2]/20"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#1B76E2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1667c7] active:scale-[0.99]"
        >
          Confirm account
        </button>
      </form>
      <button
        onClick={handleResendCode}
        type="button"
        className="w-full mt-4 rounded-lg  text-sm font-medium  transition cursor-pointer hover:text-[#1B76E2]  active:scale-[0.99]"
      >
        Resend confirmation code
      </button>
    </div>
  );
}

export default ConfirmationForm;
