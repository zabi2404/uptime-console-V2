import { useState } from "react";
import {
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState<"email" | "reset">("email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      setError("");
      setMessage("");

      const result = await resetPassword({
        username: email,
      });

      console.log(result);

      setStep("reset");
      setMessage("Confirmation code sent to your email.");
    } catch (error) {
      console.error(error);
      setError("Unable to send reset code.");
    }
  };

  const handleResetPassword = async () => {
    try {
      setError("");
      setMessage("");

      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });

      setMessage("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Invalid code or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {step === "email" ? (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Forgot Password?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter your email and we'll send you a confirmation code.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={handleSendCode}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Send Code
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Reset Password
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter the code sent to your email and choose a new password.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Code
                </label>

                <input
                  type="text"
                  placeholder="Enter confirmation code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;