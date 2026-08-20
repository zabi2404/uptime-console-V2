import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { resendSignUpCode, signIn } from "aws-amplify/auth"
import ConfirmationForm from "../../components/Auth/ConfirmationForm"

function Login() {



    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [stage, setStage] = useState<"login" | "confirm">( "login" );

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmationCode: "",
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn({
                username: formData.email,
                password: formData.password,
            });

            console.log(result);
            if (result.isSignedIn) {
                console.log("Login successful");
                window.location.href = "/";
            }
            if (result?.nextStep.signInStep === "CONFIRM_SIGN_UP") {
                await resendSignUpCode({
                    username: formData.email,
                });
                setStage("confirm");
                // localStorage.setItem("stage", "confirm");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const renderLoginForm = () => (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Sign in to monitor your services and projects.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>

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
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>

                {/* Password */}
                <div>
                    <div className="mb-1.5 flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-xs font-medium text-[#1B76E2] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onChange={handleInputChange}
                            value={formData.password}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-[#1B76E2] focus:ring-2 focus:ring-[#1B76E2]/20"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={17} />
                            ) : (
                                <Eye size={17} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 accent-[#1B76E2]"
                    />

                    <label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                    >
                        Remember me
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-[#1B76E2] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1667c7] active:scale-[0.99]"
                >
                    Sign in
                </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-medium text-[#1B76E2] hover:underline"
                >
                    Create account
                </Link>
            </p>
        </div>
    )


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg ">
                            <img src="/public/ChatGPT Image Aug 11, 2026, 04_26_33 AM.png" alt=""
                                className=" "
                            />
                        </div>

                        <span className="text-xl font-bold text-gray-900">
                            Uptime Console
                        </span>
                    </Link>
                </div>

                {/* Card */}
                {stage === "login" && renderLoginForm()}
                {stage === "confirm" && <ConfirmationForm email={formData.email}  password={formData.password} />}

                <p className="mt-6 text-center text-xs text-gray-400">
                    Monitor your services. Know when they go down.
                </p>
            </div>
        </div>
    )
}

export default Login