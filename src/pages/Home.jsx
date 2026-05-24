import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/Cartcontext";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { service } = useAuth();
  const { addToCart } = useCart();

  const trendingProducts = service.slice(0, 4);

  const featuredCategories = [
    { name: "men", count: "120+ Items", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80" },
    { name: "women", count: "240+ Items", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
    { name: "kids", count: "85+ Items", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&q=80" },
    { name: "accessories", count: "160+ Items", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" }
  ];
const Lookbook=()=>{
  toast.error("fuck you dur rah usse")
}
  return (
    <div className="w-full min-h-screen bg-[#fcfaf6] font-sans antialiased text-gray-800">

      {/* ── HERO ── */}
      <section className="relative bg-[#0f0d0b] text-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute -bottom-48 -left-48 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle at 25% 75%, #c9973f 0%, transparent 65%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-3 border border-[#c9973f]/40 bg-[#c9973f]/[0.08] rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9973f] animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#e2d7bf] font-bold">New Season Drop</span>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-[#f9f6ef]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Refined Utility.<br />
              <span className="italic text-[#e2d7bf] font-normal">Bespoke Design.</span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed font-light tracking-wide">
              Discover a tailored catalog built around sustainable craftsmanship, uncompromised performance, and sharp aesthetic.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/collection")}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-95"
              >
                Explore Collection
              </button>
              <button onClick={Lookbook}  className="px-8 py-3.5 border border-white/20 hover:border-white/60 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-95">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:col-span-5 hidden lg:block">
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-800 border border-white/10 shadow-2xl">
              {/* ✅ Show first product image from backend or fallback */}
              <img
                src={service[0]?.image || "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80"}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
            {service[1]?.image && (
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl hidden xl:block">
               <NavLink to={"/cart"}>

                 <img
                  src={service[1].image}
                  alt="Secondary"
                  className="w-full h-full object-cover"
                />
               </NavLink>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="py-12 bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-6 rounded-t-3xl max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Premium Sourcing", desc: "100% traceably harvested organic luxury fibers.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
          { title: "Free Express Delivery", desc: "Complimentary priority shipping on orders over ₹2,500.", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
          { title: "30 Day Returns", desc: "Easy returns or alternative sizing within 30 days.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 4.75M12 8v4l3 3" }
        ].map((prop, i) => (
          <div key={i} className="flex gap-4 items-start p-4 hover:bg-gray-50/60 rounded-xl transition-all">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={prop.icon} />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">{prop.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">{prop.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">Shop by Category</h2>
            <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Find exactly what you're looking for.</p>
          </div>
          <button
            onClick={() => navigate("/collection")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 tracking-wider uppercase group flex items-center gap-1.5"
          >
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCategories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/collection?category=${cat.name}`)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60 shadow-sm cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-sm font-black capitalize tracking-wide">{cat.name}</h3>
                <p className="text-[10px] text-gray-300 font-light tracking-widest mt-0.5">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING PRODUCTS — REAL DATA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">Trending Now</h2>
            <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Our most popular products right now.</p>
          </div>
          <button
            onClick={() => navigate("/collection")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 tracking-wider uppercase group flex items-center gap-1.5"
          >
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* ✅ Real products from backend */}
        {trendingProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No products available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* ✅ Real image from backend */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                   <NavLink to={"/productdetails"}>
                     <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => e.target.src = "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80"}
                    />
                   </NavLink>
                    
                    {/* ✅ Stock badge */}
                    <span className={`absolute top-3 left-3 text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border shadow-sm
                      ${item.inStock
                        ? "bg-white text-gray-900 border-gray-200"
                        : "bg-red-50 text-red-600 border-red-200"}`}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.category}</p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-4 border-t border-gray-50 mt-1">
                  <span className="text-sm font-black text-indigo-600">₹{item.price?.toLocaleString("en-IN")}</span>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase shadow-sm transition-all duration-200 active:scale-95
                      ${item.inStock
                        ? "bg-gray-900 hover:bg-indigo-600 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    {item.inStock ? "Add To Cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="bg-[#0f0d0b] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none blur-3xl"
            style={{ background: "radial-gradient(circle at 70% 30%, #c9973f 0%, transparent 65%)" }} />

          <div className="max-w-xl space-y-4 relative z-10">
            <h2 className="text-xl sm:text-3xl font-light tracking-tight text-[#f9f6ef]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Join the <span className="italic text-[#e2d7bf]">Inner Registry</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light tracking-wide">
              Subscribe for early access to new drops, exclusive offers, and member-only deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 text-xs bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#c9973f]/60 placeholder-gray-500 transition-all font-light"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c9973f] hover:bg-[#b08332] text-[#0f0d0b] font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;