
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";
import withAuth from "./withAuth";

const ManagerDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await Api.get("/managerDashboard");
                setDashboard(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load manager dashboard"
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
                <p className="text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
                <div className="rounded-xl bg-white p-6 text-center shadow">
                    <p className="mb-4 text-red-600">{error}</p>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-teal-600 px-5 py-2 text-white hover:bg-teal-700"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const manager = dashboard?.manager || dashboard?.user || {};

    const stats = [
        {
            title: "Team Members",
            value: dashboard?.teamMembers ?? 0,
            icon: "👥",
            color: "bg-sky-50 text-sky-700",
        },
        {
            title: "Active Projects",
            value: dashboard?.activeProjects ?? 0,
            icon: "📁",
            color: "bg-emerald-50 text-emerald-700",
        },
        {
            title: "Pending Approvals",
            value: dashboard?.pendingApprovals ?? 0,
            icon: "⏳",
            color: "bg-amber-50 text-amber-700",
        },
    ];

    const activities = dashboard?.recentActivities || [];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Navbar */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-teal-700">
                            WorkSpace
                        </h1>
                        <p className="text-xs text-slate-500">
                            Team Management Portal
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-right">
                            <p className="text-sm font-semibold">
                                {manager.name || "Manager"}
                            </p>
                            <p className="text-xs capitalize text-slate-500">
                                {manager.role || "manager"}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 sm:py-8">
                {/* Welcome Section */}
                <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-600 p-6 text-white shadow-sm sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <p className="mb-2 text-sm font-medium text-teal-100">
                            MANAGEMENT OVERVIEW
                        </p>

                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Manager Dashboard
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-teal-50">
                            Welcome back, {manager.name || "Manager"}! Here's
                            your team's current overview.
                        </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center self-start rounded-2xl bg-white/15 text-3xl sm:self-center">
                        📊
                    </div>
                </section>

                {/* Statistics */}
                <section>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">
                            Team Overview
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            A quick summary of your team's progress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Content */}
                <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    {/* Recent Activities */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
                        <div className="mb-5">
                            <h3 className="text-lg font-bold">
                                Recent Activities
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Latest team updates
                            </p>
                        </div>

                        {activities.length > 0 ? (
                            <ul className="space-y-4">
                                {activities.map((activity, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm text-teal-700">
                                            {index + 1}
                                        </span>

                                        <p className="break-words pt-1 text-sm leading-6 text-slate-600">
                                            {typeof activity === "string"
                                                ? activity
                                                : activity.description ||
                                                activity.title ||
                                                "Activity"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No recent activities available.
                            </p>
                        )}
                    </div>

                    {/* Manager Profile */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
                        <h3 className="text-lg font-bold">
                            Manager Profile
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Your account information
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700">
                                {(manager.name || "M")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="break-words font-semibold">
                                    {manager.name || "N/A"}
                                </p>
                                <p className="break-all text-sm text-slate-500">
                                    {manager.email || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-sm text-slate-500">
                                Account Role
                            </p>
                            <span className="mt-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-medium capitalize text-teal-700">
                                {manager.role || "manager"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Information */}
                <section className="rounded-xl border border-sky-100 bg-sky-50 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <span className="text-xl">ℹ️</span>
                        <div>
                            <h3 className="font-semibold text-sky-900">
                                Manager Access
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-sky-800">
                                Monitor team progress, review pending
                                approvals, and keep your projects on track.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default withAuth(ManagerDashboard);
