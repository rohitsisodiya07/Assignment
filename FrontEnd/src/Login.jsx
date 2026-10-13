
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "./Api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            setLoading(true);

            const response = await Api.post("/login", {
                email: formData.email.trim(),
                password: formData.password,
            });

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error("Invalid login response from server");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect according to user role
            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else if (user.role === "manager") {
                navigate("/manager", { replace: true });
            } else {
                navigate("/user", { replace: true });
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full min-w-0 rounded-md border border-gray-300 px-3 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-6 sm:px-6 sm:py-10">
            <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-md sm:p-8">
                <h1 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
                    Welcome Back
                </h1>

                <p className="mb-6 mt-2 text-center text-sm text-gray-500 sm:text-base">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            className={inputClass}
                        />
                    </div>

                    {message && (
                        <p
                            role="alert"
                            className="break-words rounded-md bg-red-50 p-3 text-center text-sm text-red-600"
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Please wait..." : "Login"}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
