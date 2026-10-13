import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesDashboard = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "https://assignment-wam8.onrender.com/sales/category-summary",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSales(response.data.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch sales data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const totalSales = sales.reduce(
        (sum, item) => sum + item.total,
        0
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                Loading sales data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
                <p className="text-red-600">{error}</p>

                <button
                    onClick={() => navigate("/admin")}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                >
                    Back to Admin Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Sales Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Category-wise shipped sales report
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin")}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium hover:bg-slate-100"
                    >
                        ← Back to Admin
                    </button>
                </div>

                {/* Total Sales */}
                <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-sm">
                    <p className="text-sm text-emerald-100">
                        Total Shipped Sales
                    </p>

                    <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                        ₹{totalSales.toLocaleString("en-IN")}
                    </h2>
                </div>

                {/* Category Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-5">
                        <h2 className="text-lg font-bold">
                            Category-wise Sales
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Results generated using MongoDB Aggregation
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Category
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Total Sales
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {sales.length > 0 ? (
                                    sales.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="border-t border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 font-medium">
                                                {item._id}
                                            </td>

                                            <td className="px-5 py-4 font-semibold text-emerald-700">
                                                ₹{item.total.toLocaleString("en-IN")}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="px-5 py-8 text-center text-slate-500"
                                        >
                                            No shipped sales found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                            {sales.length > 0 && (
                                <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                                    <tr>
                                        <td className="px-5 py-4 font-bold">
                                            Total
                                        </td>
                                        <td className="px-5 py-4 font-bold text-emerald-700">
                                            ₹{totalSales.toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDashboard;
