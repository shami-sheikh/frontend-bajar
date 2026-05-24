import React from 'react'

function About() {
  return (
    <section className="min-h-screen bg-[#fcfaf6] font-sans antialiased text-gray-800">
      
      {/* ── HERO HEADER BLOCK ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 pb-20 lg:pt-32 lg:pb-24">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 border border-[#c9973f]/40 bg-[#c9973f]/[0.08] rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9973f]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#e2d7bf] font-bold">Our Manifesto</span>
          </div>
          
          <h1 className="hero-heading text-5xl md:text-7xl font-light tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            The Future of the <span className="italic text-[#c9973f] font-normal">Bajar</span>.
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light tracking-wide pt-2">
            BajarBlizz is where heritage market sourcing converges with the speed of tomorrow. We curate architectural product essentials and deploy them with an uncompromised priority experience.
          </p>
        </div>
      </div>

      {/* ── CORE FOUNDATION BLOCK ── */}
      <div className="bg-white py-24 border-y border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Why BajarBlizz?</h2>
            <p className="text-gray-500 text-sm leading-relaxed font-light tracking-wide">
              Founded in 2024, BajarBlizz was engineered out of a shared frustration: modern commerce felt detached and slow. We wanted to build a digital platform that preserves the rich connection of a regional bazaar while operating at cutting-edge industrial speeds.
            </p>
            
            <ul className="space-y-4 pt-2">
              <li className="flex gap-4.5 items-start">
                <div className="bg-indigo-50 border border-indigo-100 p-1 rounded-lg text-indigo-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-tight">Curated Quality Matrix</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-light leading-relaxed">Only verified tier-one artifacts enter our active community directory loops.</p>
                </div>
              </li>
              <li className="flex gap-4.5 items-start">
                <div className="bg-indigo-50 border border-indigo-100 p-1 rounded-lg text-indigo-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-tight">Blizz Priority Express</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-light leading-relaxed">We optimize systemic delivery routing parameters to protect your professional calendar schedules.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Asymmetrical Collage Geometry */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Shopping Assets"/>
            </div>
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl mt-8 overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Service Delivery"/>
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUES INDICES GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="group bg-white border border-[#e8e2d7] p-8 rounded-2xl hover:shadow-md transition-all duration-300 space-y-4">
            <div className="p-3 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Lightning Fast</h3>
              <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">From checkout token routing algorithms to unboxing logistics loops, optimization remains absolute.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white border border-[#e8e2d7] p-8 rounded-2xl hover:shadow-md transition-all duration-300 space-y-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Community First</h3>
              <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">We abandon cold transaction interfaces to build structural, transparent relationships with catalog accounts.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white border border-[#e8e2d7] p-8 rounded-2xl hover:shadow-md transition-all duration-300 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Secure Bajar</h3>
              <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">Encrypted payment gateways, clear refund matrices, and authenticated distribution registries secure absolute confidence.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER TERMINUS SYSTEM ── */}
      <footer id="footer" className="py-20 text-center border-t border-gray-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <h2 className="text-4xl font-light tracking-tight text-gray-900 leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Join the <span className="italic text-[#c9973f]">Blizz</span>.
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto font-light leading-relaxed tracking-wide">
            Subscribe to secure early access parameters for seasonal deployments and upcoming catalog arrivals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your operational email address..." 
              className="flex-1 px-5 py-3 border border-gray-200 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-gray-400 bg-white shadow-inner"
            />
            <button className="bg-gray-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm shadow-gray-900/5 active:scale-95 whitespace-nowrap cursor-pointer">
              Subscribe Feed
            </button>
          </div>
          
          <p className="pt-8 text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium">&copy; 2026 BajarBlizz Inc. Architecture core.</p>
        </div>
      </footer>

    </section>
  )
}

export default About