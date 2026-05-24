import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/Cartcontext";

function Productdetails() {
  const { id } = useParams();
  const { service } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // UX Enhancement: Scroll to top when navigating between related products
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Performance: Memoize the active product finding logic
  const product = useMemo(() => {
    return service.find((item) => item._id === id);
  }, [service, id]);

  // Performance & DRY code: Calculate related products once
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return service
      .filter((item) => item.category === product.category && item._id !== product._id)
      .slice(0, 4);
  }, [service, product]);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#fcfaf6] flex flex-col items-center justify-center gap-5 p-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 mb-2">
          <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm font-light tracking-wide">Specified product could not be resolved.</p>
        <button
          onClick={() => navigate("/collection")}
          className="px-6 py-3 bg-gray-900 hover:bg-[#c9973f] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Back to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fcfaf6] py-16 px-4 sm:px-8 lg:px-12 font-sans antialiased text-gray-800">
      <div className="max-w-6xl mx-auto">

        {/* Back navigation control row */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 mb-10 transition-colors cursor-pointer group"
        >
          <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Return to Matrix
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* Product Image Frame Wrapper */}
          <NavLink to={`/productcategory/${product._id}`} className="block group">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#e8e2d7] shadow-[0_4px_25px_-6px_rgba(15,13,11,0.03)] transition-all duration-500 ease-out group-hover:scale-[1.01] group-hover:border-[#c9973f]/30 group-hover:shadow-[0_30px_60px_-20px_rgba(15,13,11,0.08)]">
              <img
                src={product.image}
                alt={product.title || "Product image"}
                className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
                onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
              />
            </div>
          </NavLink>

          {/* Product Specifications Sheet */}
          <div className="flex flex-col gap-6 lg:py-2">

            {/* Classification & stock indicators */}
            <div className="flex items-center gap-2.5">
              {product.category && (
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-md shadow-sm">
                  {product.category}
                </span>
              )}
              <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-md border shadow-sm
                ${product.inStock
                  ? "bg-emerald-50/60 text-emerald-800 border-emerald-200"
                  : "bg-rose-50/60 text-rose-700 border-rose-200"}`}>
                {product.inStock ? "In Stock" : "Sold Out"}
              </span>
            </div>

            {/* Asset Title Header */}
            <h1
              className="text-3xl sm:text-4xl font-light text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {product.title}
            </h1>

            {/* Financial Valuation Component */}
            <div>
              <p className="text-[8px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-1">Financial Valuation</p>
              <p className="text-3xl font-light text-indigo-600 tabular-nums leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                ₹{(product.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Graphic Hairline Separator */}
            <div className="h-[1px] bg-[#f0ebd9]" />

            {/* Descriptive Content Area */}
            <div>
              <p className="text-[8px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">Architectural Blueprint Description</p>
              <p className="text-sm text-gray-500 leading-relaxed font-light tracking-wide">
                {product.description || "Premium asset configuration logs integrated for comprehensive retail deployment utility settings."}
              </p>
            </div>

            {/* Graphic Hairline Separator */}
            <div className="h-[1px] bg-[#f0ebd9]" />

            {/* Registry Timestamp Metadata */}
            {product.createdAt && (
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Catalog entry established: {new Date(product.createdAt).toLocaleDateString(undefined, {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </div>
            )}

            {/* Checkout Matrix Callout Action Triggers */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 active:scale-[0.98]
                  ${product.inStock
                    ? "bg-gray-900 hover:bg-indigo-600 text-white cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-100"
                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"}`}
              >
                {product.inStock ? "Add to Cart Matrix" : "Archived Asset"}
              </button>
              
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 text-gray-600 bg-white hover:bg-indigo-50/10 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Inspect Cart Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Related Assets Context Grid Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-28">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
              <div>
                <h2 className="text-xl font-black tracking-tight text-gray-900">Related Artifacts</h2>
                <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Parallel operational configurations parsed across matching category segments.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/productdetails/${item._id}`)}
                  className="group bg-white border border-[#e8e2d7] rounded-xl overflow-hidden cursor-pointer hover:shadow-md border-b-gray-200/90 transition-all duration-500 ease-out hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square overflow-hidden bg-gray-50 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-xs font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors" title={item.title}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1 border-t border-gray-50 flex items-center justify-between gap-2 mt-1">
                    <span className="text-sm font-black text-indigo-600 tabular-nums">
                      ₹{(item.price || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all font-light">Inspect →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productdetails;