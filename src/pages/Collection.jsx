import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/Cartcontext";

function Collection() {
  const { service } = useAuth();
  const [hoveredId, setHoveredId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const location = useLocation();
  const { addToCart } = useCart();

  const categories = [
    "all",
    ...new Set(service.map((p) => p.category).filter(Boolean)),
  ];

  const filtered = service.filter((item) => {
    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchStock =
      stockFilter === "all" ||
      (stockFilter === "inStock" && item.inStock) ||
      (stockFilter === "outOfStock" && !item.inStock);
    return matchSearch && matchCategory && matchStock;
  });

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setStockFilter("all");
    setCurrentPage(1);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, stockFilter]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  const isFiltered =
    search !== "" || activeCategory !== "all" || stockFilter !== "all";

  return (
    <div className="w-full min-h-screen bg-[#fcfaf6] pb-20 font-sans antialiased selection:bg-[#c9973f]/20 selection:text-[#0f0d0b]">

      {/* ── Hero ── */}
      <div className="relative bg-[#0f0d0b] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle at 75% 25%, #d4a843 0%, transparent 70%)" }}
        />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9973f]/40 to-transparent" />

        {/* Reduced padding on mobile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-10 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-24 relative z-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-5 h-[1px] bg-[#c9973f]" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c9973f] font-medium">
              Curated Selection
            </span>
          </div>

          {/* Smaller headline min size on mobile */}
          <h1
            className="text-[2.6rem] sm:text-[clamp(3.5rem,8vw,6rem)] font-extralight leading-[0.9] tracking-tight text-[#f9f6ef] mb-5 sm:mb-8"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontStyle: "italic" }}
          >
            Our<br />
            <span className="not-italic font-light tracking-wide text-[#e2d7bf]">Collection</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8">
            <p className="text-[13px] sm:text-[14px] text-[#8e8577] max-w-sm leading-[1.8] tracking-wide font-light">
              Discover our latest masterworks, meticulously developed with premium sourcing parameters.
            </p>
            <div className="inline-flex self-start sm:self-auto items-center gap-2.5 border border-[#c9973f]/30 bg-[#c9973f]/[0.06] rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9973f]" style={{ animation: "pulse 2.5s ease-in-out infinite" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#e2d7bf] font-semibold">
                {service.length} online
              </span>
            </div>
          </div>
        </div>

        <div className="h-8 sm:h-12 bg-gradient-to-b from-transparent to-[#fcfaf6] relative z-10" />
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c9973f]/60 to-transparent -mt-[1px] relative z-20" />

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-0 z-30 bg-[#fcfaf6]/90 backdrop-blur-xl border-b border-[#ebdccb]/60 shadow-[0_2px_20px_-10px_rgba(15,13,11,0.06)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 py-2.5 sm:py-4 flex flex-col gap-2 sm:gap-3">

          {/* Row 1 — Search + Stock toggle side by side */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 group">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aba293] transition-colors duration-300 group-focus-within:text-[#c9973f]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-[12px] sm:text-[13px] pl-8 sm:pl-10 pr-8 py-2 sm:py-3 bg-white border border-[#e1dacd] text-[#1a1714] placeholder-[#c4bbae] outline-none transition-all duration-300 rounded-md focus:border-[#c9973f]/80 focus:ring-2 focus:ring-[#c9973f]/5 shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#aba293] bg-[#f0ece2] w-4 h-4 rounded-full flex items-center justify-center text-[9px] transition-all"
                >✕</button>
              )}
            </div>

            {/* Stock toggle — short labels on mobile, full on desktop */}
            <div className="flex rounded-md overflow-hidden border border-[#e1dacd] bg-white p-0.5 shadow-sm shrink-0">
              {[
                { value: "all", short: "All", full: "All Works" },
                { value: "inStock", short: "In", full: "In Stock" },
                { value: "outOfStock", short: "Out", full: "Sold Out" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStockFilter(opt.value)}
                  className={`text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.18em] uppercase px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-all duration-300 whitespace-nowrap font-semibold
                    ${stockFilter === opt.value
                      ? "bg-[#0f0d0b] text-[#f9f6ef]"
                      : "text-[#8a8278] hover:bg-[#fcfaf6] hover:text-[#1a1714]"
                    }`}
                >
                  <span className="sm:hidden">{opt.short}</span>
                  <span className="hidden sm:inline">{opt.full}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 — Category pills: horizontal scroll on mobile */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap no-scrollbar flex-1 pb-0.5 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.22em] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border transition-all duration-300 capitalize font-semibold whitespace-nowrap shrink-0
                    ${activeCategory === cat
                      ? "bg-[#c9973f] border-[#c9973f] text-[#0f0d0b]"
                      : "bg-white border-[#e1dacd] text-[#7a7268] hover:border-[#c9973f]/60 hover:text-[#c9973f]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {isFiltered && (
              <button
                onClick={clearFilters}
                title="Reset filters"
                className="shrink-0 text-[#c9973f] hover:text-[#0f0d0b] font-bold transition-colors flex items-center gap-1"
              >
                <span className="text-base leading-none">↺</span>
                <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase">Reset</span>
              </button>
            )}
          </div>

          {/* Row 3 — Compact count + page info */}
          <div className="flex items-center justify-between border-t border-[#ebdccb]/40 pt-1.5 sm:pt-2">
            <span className="text-[10px] sm:text-[11px] text-[#aba293] font-light tracking-wide tabular-nums">
              <span className="text-[#1a1714] font-semibold">{filtered.length}</span>
              {" "}/ {service.length} items
              {totalPages > 1 && (
                <span> · Page {currentPage}/{totalPages}</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 pt-5 sm:pt-12">

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-sm mx-auto bg-white border border-[#ebdccb]/60 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#fcfaf6] border border-[#e1dacd] flex items-center justify-center mb-4 text-[#aba293]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-[#1a1714] mb-2 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              No Results Found
            </h3>
            <p className="text-[12px] text-[#8a8278] mb-6 leading-relaxed font-light">
              No products match your current filters.
            </p>
            <button
              onClick={clearFilters}
              className="w-full text-[10px] tracking-[0.25em] uppercase px-6 py-3 bg-[#0f0d0b] text-[#f9f6ef] hover:bg-[#c9973f] hover:text-[#0f0d0b] rounded-md transition-all duration-300 font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Grid — 2 cols on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-x-6 sm:gap-y-10">
          {paginated.map((item, idx) => (
            <div
              key={item._id}
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group bg-white border border-[#e8e2d7] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out
                ${hoveredId === item._id
                  ? "sm:-translate-y-2.5 shadow-[0_20px_40px_-10px_rgba(15,13,11,0.12),0_0_0_1px_rgba(201,151,63,0.3)] border-[#c9973f]/40"
                  : "shadow-[0_2px_10px_-4px_rgba(15,13,11,0.06)]"
                }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4eff5]">
                <NavLink to={`/productdetails/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[800ms] ease-out
                      ${hoveredId === item._id ? "scale-[1.06]" : "scale-100"}`}
                  />
                </NavLink>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/30 via-transparent to-transparent opacity-60 pointer-events-none" />

                <span
                  className={`absolute top-2 left-2 text-[7px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-sm backdrop-blur-md shadow-sm border
                    ${item.inStock
                      ? "bg-white/95 text-emerald-800 border-emerald-800/10"
                      : "bg-[#0f0d0b]/85 text-[#f9f6ef] border-white/10"
                    }`}
                >
                  {item.inStock ? "In Stock" : "Sold Out"}
                </span>

                {item.category && (
                  <span
                    className={`absolute bottom-2 left-2 text-[7px] tracking-[0.15em] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#c9973f] text-[#0f0d0b] transition-all duration-500 shadow-sm
                      ${hoveredId === item._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                  >
                    {item.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3
                    className="text-[0.9rem] sm:text-[1.3rem] font-light text-[#1a1714] leading-tight tracking-tight mb-1 sm:mb-2.5 transition-colors duration-300 group-hover:text-[#c9973f] line-clamp-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  {/* Description hidden on mobile */}
                  <p className="hidden sm:block text-[12px] text-[#847b6e] leading-relaxed mb-5 line-clamp-2 tracking-wide font-light">
                    {item.description || "Premium product."}
                  </p>
                </div>

                <div>
                  {/* Separator hidden on mobile */}
                  <div className="hidden sm:flex items-center gap-2.5 mb-4">
                    <div className="flex-1 h-[1px] bg-[#f0ebd9]" />
                    <div className="w-1.5 h-1.5 rounded-full border border-[#c9973f]/40 bg-white" />
                    <div className="flex-1 h-[1px] bg-[#f0ebd9]" />
                  </div>

                  <div className="flex items-center justify-between gap-1.5 sm:gap-4 mt-2 sm:mt-0">
                    <div className="shrink-0 min-w-0">
                      <p className="hidden sm:block text-[8px] tracking-[0.25em] uppercase text-[#aba293] mb-1 font-semibold">
                        Valuation
                      </p>
                      <p
                        className="text-[1rem] sm:text-[1.65rem] font-light text-[#1a1714] tracking-tight leading-none tabular-nums truncate"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        ₹{item.price?.toLocaleString("en-IN") || "0"}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className={`text-[7px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.22em] uppercase font-bold px-2 sm:px-4 py-1.5 sm:py-3 rounded-md transition-all duration-300 shadow-sm whitespace-nowrap shrink-0
                        ${item.inStock
                          ? "bg-[#0f0d0b] text-[#f9f6ef] hover:bg-[#c9973f] hover:text-[#0f0d0b] active:scale-[0.97] cursor-pointer"
                          : "bg-[#f2efe6] text-[#bdae9c] cursor-not-allowed shadow-none"
                        }`}
                    >
                      {item.inStock ? "Add to Cart" : "Sold Out"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer rule */}
        {filtered.length > 0 && (
          <div className="mt-14 sm:mt-24 flex items-center gap-4 max-w-2xl mx-auto opacity-70">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#e3dcd2] to-transparent" />
            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#aba293] font-light whitespace-nowrap">
              End of Collection
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#e3dcd2] to-transparent" />
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8 mb-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              style={{ background: "#f4f4f5", color: "#3f3f46" }}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) =>
                page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
              )
              .reduce((acc, page, idx, arr) => {
                if (idx > 0 && page - arr[idx - 1] > 1) acc.push("...");
                acc.push(page);
                return acc;
              }, [])
              .map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-1 text-gray-400 text-xs font-bold">···</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 rounded-xl text-xs font-bold transition-all"
                    style={
                      currentPage === page
                        ? { background: "#18181b", color: "#fff" }
                        : { background: "#f4f4f5", color: "#52525b" }
                    }
                  >
                    {page}
                  </button>
                )
              )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              style={{ background: "#f4f4f5", color: "#3f3f46" }}
            >
              Next →
            </button>
          </div>
        )}

      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Collection;