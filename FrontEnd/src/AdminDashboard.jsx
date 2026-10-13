
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";
import withAuth from "./withAuth";

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await Api.get("/adminDashboard");
                setDashboard(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load admin dashboard"
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
                <div className="rounded-xl bg-white p-6 text-center shadow">
                    <p className="mb-4 text-red-600">{error}</p>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    const admin = dashboard?.admin || dashboard?.user || {};

    const stats = [
        {
            title: "Total Users",
            value: dashboard?.totalUsers ?? 0,
            icon: "👥",
            color: "bg-indigo-50 text-indigo-700",
        },
        {
            title: "Total Managers",
            value: dashboard?.totalManagers ?? 0,
            icon: "🧑‍💼",
            color: "bg-violet-50 text-violet-700",
        },
        {
            title: "Active Projects",
            value: dashboard?.activeProjects ?? 0,
            icon: "📊",
            color: "bg-emerald-50 text-emerald-700",
        },
        {
            title: "Pending Approvals",
            value: dashboard?.pendingApprovals ?? 0,
            icon: "⏳",
            color: "bg-amber-50 text-amber-700",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Navbar */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-indigo-700">
                            WorkSpace
                        </h1>
                        <p className="text-xs text-slate-500">
                            Administration Portal
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-right">
                            <p className="text-sm font-semibold">
                                {admin.name || "Admin"}
                            </p>
                            <p className="text-xs text-slate-500">
                                Administrator
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
                {/* Welcome Banner */}
                <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 p-6 text-white shadow-sm sm:p-8">
                    <p className="mb-2 text-sm font-medium text-indigo-200">
                        ADMINISTRATION OVERVIEW
                    </p>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Admin Dashboard
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-indigo-100">
                                Welcome back, {admin.name || "Admin"}! Manage
                                users, monitor projects, and oversee your system.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl bg-white/15 text-3xl sm:self-center">
                            🛡️
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">
                            System Overview
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Summary of users, managers, and project activity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm text-slate-500">
                                        {item.title}
                                    </p>

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${item.color}`}
                                    >
                                        {item.icon}
                                    </div>
                                </div>

                                <p className="mt-4 text-3xl font-bold text-slate-800">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sales Dashboard Card */}
                <section>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">
                            Sales Management
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            View sales analytics and category-wise performance.
                        </p>
                    </div>

                    <div className="flex flex-col justify-between gap-5 rounded-xl border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                                📈
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-slate-800">
                                    Sales Dashboard
                                </h4>

                                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                                    View shipped sales totals grouped by category
                                    using MongoDB Aggregation.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/sales")}
                            className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            View Sales →
                        </button>
                    </div>
                </section>

                {/* Main Sections */}
                <section className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    {/* Admin Profile */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
                        <h3 className="text-lg font-bold">
                            Administrator Profile
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Your account details
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                                {(admin.name || "A").charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="break-words font-semibold">
                                    {admin.name || "N/A"}
                                </p>

                                <p className="break-all text-sm text-slate-500">
                                    {admin.email || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-sm text-slate-500">
                                Account Role
                            </p>

                            <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium capitalize text-indigo-700">
                                {admin.role || "admin"}
                            </span>
                        </div>
                    </div>

                    {/* Admin Responsibilities */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
                        <h3 className="text-lg font-bold">
                            Administration Summary
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Key areas to keep track of
                        </p>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3 rounded-lg bg-indigo-50 p-4">
                                <span className="text-xl">👥</span>
                                <div>
                                    <p className="font-semibold text-indigo-900">
                                        User Management
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-indigo-800">
                                        Review the registered user count and
                                        manage account access.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-lg bg-violet-50 p-4">
                                <span className="text-xl">📁</span>
                                <div>
                                    <p className="font-semibold text-violet-900">
                                        Project Monitoring
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-violet-800">
                                        Keep track of active projects and
                                        overall progress.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4">
                                <span className="text-xl">✅</span>
                                <div>
                                    <p className="font-semibold text-amber-900">
                                        Pending Approvals
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-amber-800">
                                        Monitor items awaiting review or
                                        approval.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Information */}
                <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <span className="text-xl">ℹ️</span>

                        <div>
                            <h3 className="font-semibold text-indigo-900">
                                Administrator Access
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-indigo-800">
                                Administrators oversee users, managers,
                                projects, sales, and approval workflows.
                                Make sure access is assigned securely.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default withAuth(AdminDashboard);
