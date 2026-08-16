import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Eye, EyeOff } from "lucide-react";

function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B76E2]">
              <Activity size={20} className="text-white" />
            </div>

            <span className="text-xl font-bold text-gray-900">
              Uptime Console
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Start monitoring your services with Uptime Console.
            </p>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#1B76E2] focus:ring-2 focus:ring-[#1B76E2]/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#1B76E2] focus:ring-2 focus:ring-[#1B76E2]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-[#1B76E2] focus:ring-2 focus:ring-[#1B76E2]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Use at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#1B76E2]"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-5 text-gray-500"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-[#1B76E2] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#1B76E2] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1B76E2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1667c7] active:scale-[0.99]"
            >
              Create account
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#1B76E2] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Monitor your services. Know when they go down.
        </p>
      </div>
    </div>
  );
}

export default Signup;
