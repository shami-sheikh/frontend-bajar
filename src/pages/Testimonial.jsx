import React from 'react';
import { FiStar } from 'react-icons/fi';

function Testimonial() {
  const feedbacks = [
    {
      id: 1,
      name: "Aryan Gupta",
      role: "Verified Buyer",
      comment: "The quality of the fabric is just amazing. It feels premium and the fit is perfect. Definitely my new favorite store!",
      rating: 5,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan"
    },
    {
      id: 2,
      name: "Sara Khan",
      role: "Fashion Blogger",
      comment: "BazarBlizz never disappoints. The shipping was incredibly fast, and the packaging was so elegant. 10/10 recommendation!",
      rating: 5,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
    },
    {
      id: 3,
      name: "Ravi Teja",
      role: "Loyal Customer",
      comment: "I love the minimalist design of the products. They look even better in person than in the photos. Great service!",
      rating: 4,
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi"
    }
  ];

  return (
    <div className='w-full min-h-screen px-4 py-24 bg-[#fcfaf6] font-sans antialiased text-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>
        
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20'>
          <div className='flex flex-col gap-3.5 max-w-xl'>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-[#c9973f]" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c9973f] font-bold">Client Verifications</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-light tracking-tight text-gray-900 leading-none' style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              People <span className='text-[#c9973f] italic font-normal'>say</span>
            </h1>
            <p className='text-gray-500 text-sm leading-relaxed font-light tracking-wide pt-1'>
              Real stories shared directly by our global registry regarding premium texture performance, delivery tracking loops, and daily structural style execution.
            </p>
          </div>
          <div className='hidden md:block select-none pb-2'>
            <span className='text-7xl font-black text-gray-900/[0.03] tracking-widest block leading-none'>JOURNALS</span>
          </div>
        </div>

        {/* Feedback Cards Grid Matrix */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
          {feedbacks.map((item) => (
            <div 
              key={item.id} 
              className='group bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e2d7] hover:border-[#c9973f]/40 shadow-[0_4px_20px_-6px_rgba(15,13,11,0.03)] hover:shadow-[0_25px_50px_-20px_rgba(15,13,11,0.08)] flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1.5'
            >
              <div>
                {/* Custom Styled Stars */}
                <div className='flex gap-1 mb-5 text-[#c9973f]'>
                  {[...Array(item.rating)].map((_, i) => (
                    <FiStar key={i} size={13} fill="currentColor" className="stroke-none" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <FiStar key={i} size={13} className="text-gray-200" />
                  ))}
                </div>
                
                {/* Quote Content Frame */}
                <p className='text-gray-600 font-light text-sm leading-relaxed mb-8 tracking-wide relative z-10'>
                  “{item.comment}”
                </p>
              </div>

              {/* Ornamental Card Interior Grid Line */}
              <div>
                <div className="flex items-center gap-2 mb-4.5 opacity-40">
                  <div className="flex-1 h-[1px] bg-[#f0ebd9]" />
                  <div className="w-1 h-1 rounded-full bg-[#c9973f]" />
                  <div className="flex-1 h-[1px] bg-[#f0ebd9]" />
                </div>

                {/* User Information Node Profile */}
                <div className='flex items-center gap-4.5'>
                  <div className="relative shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className='w-11 h-11 rounded-xl bg-gray-50 border border-[#e8e2d7] relative z-10 p-0.5 group-hover:border-[#c9973f]/50 transition-colors duration-300' 
                    />
                    <div className="absolute inset-0 bg-indigo-50 rounded-xl transform rotate-3 scale-95 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className='text-xs font-bold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-indigo-600'>
                      {item.name}
                    </h4>
                    <p className='text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5'>
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Testimonial;