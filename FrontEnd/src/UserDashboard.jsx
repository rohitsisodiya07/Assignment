
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";
import withAuth from "./withAuth";

const UserDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await Api.get("/userDashboard");
                setDashboard(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load user dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
                <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                    <p className="mb-4 text-red-600">{error}</p>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const user = dashboard?.user || dashboard?.userData || {};

    const stats = [
        {
            title: "My Tasks",
            value: dashboard?.myTasks ?? 0,
            icon: "📋",
            color: "bg-violet-100",
        },
        {
            title: "Notifications",
            value: dashboard?.notifications ?? 0,
            icon: "🔔",
            color: "bg-sky-100",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Navbar */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <div>
                        <h1 className="text-xl font-bold text-violet-700">
                            WorkSpace
                        </h1>

                        <p className="text-xs text-slate-500">
                            Personal Dashboard
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
                {/* Welcome Section */}
                <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-sm sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <p className="mb-2 text-sm font-medium text-violet-200">
                            YOUR WORKSPACE
                        </p>

                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Hello, {user.name || "User"}!
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-violet-100">
                            Welcome to your dashboard. Here's your current overview.
                        </p>
                    </div>

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl bg-white/15 text-3xl sm:self-center">
                        👋
                    </div>
                </section>

                {/* Statistics */}
                <section>
                    <h3 className="mb-4 text-lg font-bold">
                        My Overview
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                            >
                                <div>
                                    <p className="text-sm text-slate-500">
                                        {item.title}
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-800">
                                        {item.value}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${item.color}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Profile */}
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h3 className="text-lg font-bold">
                        My Profile
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Your account information
                    </p>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
                            {(user.name || "U")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <h4 className="break-words text-lg font-semibold">
                                {user.name || "N/A"}
                            </h4>

                            <p className="break-all text-sm text-slate-500">
                                {user.email || "N/A"}
                            </p>

                            <span className="mt-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-medium capitalize text-violet-700">
                                {user.role || "user"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Access Information */}
                <section className="rounded-xl border border-violet-100 bg-violet-50 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <span className="text-xl">ℹ️</span>

                        <div>
                            <h3 className="font-semibold text-violet-900">
                                Your Access
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-violet-800">
                                You can view your profile and check your tasks
                                and notifications from this dashboard.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default withAuth(UserDashboard);
