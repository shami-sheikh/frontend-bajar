import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

function Contacts() {
  const [contactdata, setcontactdata] = useState([])
  const { AuthorizationToken } = useAuth()

  const getallcontactdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/user/admincontact", {  // ✅ http
        method: "GET",
        headers: { Authorization: AuthorizationToken }
      })
      const data = await response.json()
      if (response.ok) {
        setcontactdata(data.contacts)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deletecontact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/user/admin/deletecontact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        }
      })
      const data = await response.json()
      if (response.ok) {
        getallcontactdata()
        toast.success("message deleted successful")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getallcontactdata();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans antialiased text-gray-800">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Recent Messages
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review, track, and manage incoming communication feeds from your clients.
            </p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-semibold tracking-wide self-start sm:self-auto">
            {contactdata.length} Message{contactdata.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Empty State Fallback */}
        {contactdata.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-50 p-4 rounded-xl mb-4 text-indigo-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900">Inbox is completely clear</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">
              No recent external support requests or general contact logs have been loaded.
            </p>
          </div>
        )}

        {/* Message Feeds Container */}
        <div className="space-y-4">
          {contactdata.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white border border-gray-200/80 rounded-xl p-5 hover:shadow-md transition-all duration-200 space-y-4"
            >
              {/* Card Meta Segment */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center font-bold text-base shadow-sm shrink-0 uppercase">
                    {item.userName?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
                      {item.userName}
                    </p>
                    <p className="text-gray-500 text-xs font-medium">{item.email}</p>
                  </div>
                </div>

                {/* Control Action Matrix */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-0 border-gray-50 pt-2 sm:pt-0">
                  <span className="text-gray-400 text-[11px] font-semibold flex items-center gap-1 order-last sm:order-first">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <button 
                    onClick={() => deletecontact(item._id)} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold transition-all duration-150 shadow-sm active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Message
                  </button>
                </div>
              </div>

              {/* Message Content Node */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3 text-gray-600 text-sm leading-relaxed tracking-wide font-light">
                {item.message || <span className="text-gray-400 italic font-normal">This incoming message container was transmitted empty.</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts