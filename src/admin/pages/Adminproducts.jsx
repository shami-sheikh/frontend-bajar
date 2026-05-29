import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";
import toast from "react-hot-toast";
import AddProducts from "../models/AddProducts";
import Updateproductmodals from "../models/Updateproductmodals";
import { NavLink } from "react-router-dom";

/* ─── Inject custom font + animations ─── */
const styleTag = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .ap-root { font-family: 'DM Sans', system-ui, sans-serif; }
  .ap-display { font-family: 'Syne', system-ui, sans-serif; }

  @keyframes ap-fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ap-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ap-pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  .ap-card-enter {
    animation: ap-fadeUp 0.35s ease both;
  }

  .ap-product-card {
    transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .ap-product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.12);
    border-color: #6366f1 !important;
  }

  .ap-img-zoom img {
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .ap-product-card:hover .ap-img-zoom img {
    transform: scale(1.07);
  }

  .ap-btn-edit:hover  { background: #059669; color: #fff; border-color: #059669; }
  .ap-btn-delete:hover{ background: #dc2626; color: #fff; border-color: #dc2626; }

  .ap-spinner {
    width: 36px; height: 36px;
    border: 3px solid #e0e7ff;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: ap-spin 0.75s linear infinite;
  }

  .ap-dot-live {
    animation: ap-pulse-dot 1.8s ease-in-out infinite;
  }

  .ap-page-btn {
    transition: background 0.15s, color 0.15s, transform 0.1s;
  }
  .ap-page-btn:active { transform: scale(0.94); }

  .ap-search-input:focus {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    border-color: #6366f1;
  }

  .ap-cat-chip {
    transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  }
  .ap-cat-chip:hover { box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
`;

function Adminproducts() {
  const [selectedproduct, setselectedproduct] = useState(null);
  const [openProductModels, setopenProductModels] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { AuthorizationToken } = useAuth();
  const [openupdatemodels, setopenupdatemodels] = useState(false);
  /* ── inject styles once ── */
  useEffect(() => {
    const id = "ap-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = styleTag;
      document.head.appendChild(el);
    }
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/user/admin/products`,
        { method: "GET", headers: { Authorization: AuthorizationToken } },
      );
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // delte products
  const delteAllproducts = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/user/admin/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: AuthorizationToken },
        },
      );

      if (response.ok) {
        toast.success("Deleted successfully");
        getAllProducts();
      } else {
        const data = await response.json();
        toast.error(data?.message || "Failed to delete product"); // ← use the error message from server
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filtered = products.filter((item) => {
    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handleCategory = (cat) => {
    setCategoryFilter(cat);
    setCurrentPage(1);
  };

  return (
    <div
      className="ap-root min-h-screen p-6 sm:p-10"
      style={{
        background: "linear-gradient(160deg, #f8f8ff 0%, #f1f5f9 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Header ── */}
        <div
          className="ap-card-enter rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #18181b 0%, #27272a 60%, #3730a3 100%)",
            boxShadow: "0 8px 32px -4px rgba(99,102,241,0.25)",
          }}
        >
          <div className="px-7 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <div>
              <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-1">
                Admin Panel
              </p>
              <h1 className="ap-display text-3xl font-extrabold text-white tracking-tight leading-none">
                Product Management
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                View, add, and manage your store's inventory.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {/* Count pill */}
               <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#a5b4fc",
                }}
              >
                <span
                  className="ap-dot-live inline-block w-2 h-2 rounded-full"
                  style={{ background: "#6366f1" }}
                />
                {products.length} product{products.length !== 1 ? "s" : ""}
              </div>
              {/* Add button */}
              <button
                onClick={() => setopenProductModels(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #818cf8)",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.45)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Product
              </button>
            </div>
          </div>

          {/* Decorative bar */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)",
            }}
          />
        </div>

        {/* ── Search + Filter Bar ── */}
        {!loading && products.length > 0 && (
          <div
            className="ap-card-enter rounded-2xl border border-gray-200/60 bg-white p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
            style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name, category, description…"
                value={search}
                onChange={handleSearch}
                className="ap-search-input w-full pl-11 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className="ap-cat-chip text-xs px-3.5 py-2 rounded-lg font-semibold capitalize transition-all"
                  style={
                    categoryFilter === cat
                      ? {
                          background: "#18181b",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }
                      : { background: "#f4f4f5", color: "#52525b" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              className="text-xs font-semibold whitespace-nowrap lg:border-l lg:pl-4 self-end lg:self-auto"
              style={{ color: "#a1a1aa", borderColor: "#e4e4e7" }}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <div
            className="bg-white rounded-2xl border border-gray-200/60 p-24 flex flex-col items-center justify-center gap-4"
            style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
          >
            <div className="ap-spinner" />
            <span className="text-sm font-medium text-gray-400 tracking-wide">
              Fetching inventory…
            </span>
          </div>
        )}

        {/* ── Empty State: no products ── */}
        {!loading && products.length === 0 && (
          <div
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 flex flex-col items-center justify-center text-center"
            style={{ minHeight: "380px" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "#eef2ff" }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "#6366f1" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="ap-display text-xl font-bold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mb-7 leading-relaxed">
              Start building your catalog. Add your first product and it will
              appear here.
            </p>
            <button
              onClick={() => setopenProductModels(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-transform"
              style={{ background: "#18181b", color: "#fff" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add your first product
            </button>
          </div>
        )}

        {/* ── No Search Results ── */}
        {!loading && products.length > 0 && filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/60 p-16 flex flex-col items-center justify-center text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "#f4f4f5" }}
            >
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>
            <h3 className="ap-display text-lg font-bold text-gray-900">
              No results found
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
              Nothing matched your filters or keywords. Check for typos or try a
              different term.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
              }}
              className="mt-5 text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-transform"
              style={{ background: "#18181b", color: "#fff" }}
            >
              Reset filters
            </button>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && paginated.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((item, idx) => (
                <div
                  key={item._id}
                  className="ap-product-card ap-card-enter bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col justify-between"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Image */}
                  <div
                    className="ap-img-zoom relative overflow-hidden bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {item.image ? (
                     <NavLink to={"/adminproductdetails"}>
                       <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                     </NavLink>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: "#eef2ff" }}
                      >
                        <svg
                          className="w-10 h-10"
                          style={{ color: "#c7d2fe" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Stock badge overlay */}
                    <span
                      className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={
                        item.inStock
                          ? {
                              background: "rgba(236,253,245,0.95)",
                              color: "#065f46",
                              border: "1px solid #6ee7b7",
                            }
                          : {
                              background: "rgba(255,241,242,0.95)",
                              color: "#9f1239",
                              border: "1px solid #fda4af",
                            }
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: item.inStock ? "#10b981" : "#f43f5e",
                        }}
                      />
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className="ap-display text-sm font-bold text-gray-900 line-clamp-1 leading-snug"
                        title={item.title}
                      >
                        {item.title}
                      </h2>
                      {item.category && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize flex-shrink-0"
                          style={{ background: "#f4f4f5", color: "#71717a" }}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description || "No description provided."}
                    </p>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                          Price
                        </p>
                        <span
                          className="ap-display text-lg font-extrabold"
                          style={{ color: "#4f46e5" }}
                        >
                          ₹{item.price?.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium text-right leading-relaxed">
                        Added
                        <br />
                        <span className="text-gray-500 font-semibold">
                          {new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={() => {
                        setselectedproduct(item);
                        setopenupdatemodels(true);
                      }}
                      className="ap-btn-edit flex-1 inline-flex justify-center items-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 active:scale-95"
                      style={{
                        background: "#f0fdf4",
                        color: "#15803d",
                        borderColor: "#bbf7d0",
                      }}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => delteAllproducts(item._id)}
                      className="ap-btn-delete flex-1 inline-flex justify-center items-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 active:scale-95"
                      style={{
                        background: "#fff1f2",
                        color: "#be123c",
                        borderColor: "#fecdd3",
                      }}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div
                className="bg-white rounded-2xl border border-gray-200/60 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
              >
                <p className="text-sm text-gray-400 font-medium">
                  Showing{" "}
                  <span className="font-bold text-gray-800">
                    {(currentPage - 1) * productsPerPage + 1}
                  </span>{" "}
                  –{" "}
                  <span className="font-bold text-gray-800">
                    {Math.min(currentPage * productsPerPage, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-800">
                    {filtered.length}
                  </span>{" "}
                  products
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="ap-page-btn px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "#f4f4f5", color: "#3f3f46" }}
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1,
                    )
                    .reduce((acc, page, idx, arr) => {
                      if (idx > 0 && page - arr[idx - 1] > 1) acc.push("...");
                      acc.push(page);
                      return acc;
                    }, [])
                    .map((page, idx) =>
                      page === "..." ? (
                        <span
                          key={`dots-${idx}`}
                          className="px-2 text-gray-400 text-xs font-bold"
                        >
                          ···
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className="ap-page-btn w-8 h-8 rounded-xl text-xs font-bold"
                          style={
                            currentPage === page
                              ? { background: "#18181b", color: "#fff" }
                              : { background: "#f4f4f5", color: "#52525b" }
                          }
                        >
                          {page}
                        </button>
                      ),
                    )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="ap-page-btn px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "#f4f4f5", color: "#3f3f46" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Add Product Modal ── */}
      <AddProducts
        openProductModels={openProductModels}
        closeModals={() => setopenProductModels(false)}
        getAllProducts={getAllProducts}
      />

      <Updateproductmodals
        openupdatemodels={openupdatemodels}
        closeupdate={() => setopenupdatemodels(false)}
        selectedproduct={selectedproduct}
        getAllProducts={getAllProducts}
      />
    </div>
  );
}

export default Adminproducts;
