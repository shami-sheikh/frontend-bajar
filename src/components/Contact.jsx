import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from '../utils/api'

function Contact() {
  const {AuthorizationToken,user}=useAuth()
  const [formdata,setformdata]=useState({
    userName:"",
    email:"",
    message:""
  })
  const handleinput=(e,key)=>{
    setformdata({
      ...formdata,
[key]:e.target.value
    })
  }
  const getmessage=async()=>{
    try {
      const headers = { "Content-Type": "application/json" };
      if (AuthorizationToken) headers.Authorization = AuthorizationToken;
      const response = await fetch(`${API_BASE_URL}/auth/form/contact`, {
        method: "POST",
        headers,
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Message sent successfully ✅");
        setformdata((prev) => ({ ...prev, message: "" }));
      } else {
        toast.error(data.message || data.msg || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.message || "Network error");
    }
  }
  useEffect(()=>{
    if(user){
      setformdata({
        userName:user.userName||"",
        email:user.email||"",
        message:""
      })
    }
  },[user])
  return (
    <div className="min-h-screen bg-transparent text-gray-800 p-6 md:p-12 flex flex-col items-center justify-center">
      
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r select-none from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Have a question, feedback, or want to work together? Drop us a message and our team will get back to you shortly.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Contact Form UI */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-gray-200/80 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Send a Message</h2>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
           <div className='grid md:flex grid-cols-1 gap-6 justify-center'>
             <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                userName
              </label>
              <input 
              value={formdata.userName}
              onChange={(e)=>handleinput(e,"userName")}
                type="text" 
                placeholder="joh.down" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input 
                type="email"
                value={formdata.email}
                onChange={(e)=>handleinput(e,'email')} 
                placeholder="johndoe@example.com" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
           </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea 
                rows="5" 
                value={formdata.message}
                onChange={(e)=>handleinput(e,"message")}
                placeholder="Write your message here..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              onClick={getmessage}
              className="w-full bg-blue-600 cursor-pointer active:scale-[0.98] hover:bg-blue-700 text-white transition-all duration-200 py-3.5 rounded-xl font-medium text-sm shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          
          {/* Card 1: Email */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 overhead">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Us</h3>
              <p className="text-xs text-gray-500 mt-0.5">Our support team is here to help.</p>
              <p className="text-sm font-semibold text-blue-600 mt-2 select-all">support@yourdomain.com</p>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Call Us</h3>
              <p className="text-xs text-gray-500 mt-0.5">Mon-Fri from 9am to 6pm.</p>
              <p className="text-sm font-semibold text-purple-600 mt-2 select-all">+1 (555) 000-0000</p>
            </div>
          </div>

          {/* Card 3: Office */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="bg-green-50 p-3 rounded-xl text-green-600">
              <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Visit Us</h3>
              <p className="text-xs text-gray-500 mt-0.5">Come say hello at our office HQ.</p>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                123 Innovation Way,<br />Tech Suite 404, San Francisco, CA
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact