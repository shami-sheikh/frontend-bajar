import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"

function Dashboard() {
  const { AuthorizationToken } = useAuth()
  const [products, setProducts] = useState([])

  const getProducts = async () => {  // ✅ no id param
  try {
    const response = await fetch("http://localhost:5000/auth/user/admin/products", {  // ✅ correct URL
      method: "GET",
      headers: { Authorization: AuthorizationToken }
    })
    const data = await response.json()
    if (response.ok) setProducts(data.products)
  } catch (error) {
    toast.error(error.message)
  }
}
  useEffect(() => {
    getProducts()
  }, [])

  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0)
  const totalRemaining = totalStock - totalSold
  const lowStock = products.filter((p) => (p.stock - p.sold) <= 5 && p.stock > 0)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-black text-gray-800">Inventory Overview</h1>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Products</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-indigo-400 uppercase tracking-wider font-semibold">Total Stock</p>
          <p className="text-3xl font-black text-indigo-600 mt-1">{totalStock}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-green-400 uppercase tracking-wider font-semibold">Total Sold</p>
          <p className="text-3xl font-black text-green-600 mt-1">{totalSold}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-orange-400 uppercase tracking-wider font-semibold">Remaining</p>
          <p className="text-3xl font-black text-orange-500 mt-1">{totalRemaining}</p>
        </div>
      </div>

      {/* ✅ Low Stock Warning */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h2 className="text-sm font-black text-red-700 mb-3">
            ⚠️ Low Stock Alert ({lowStock.length} products)
          </h2>
          <div className="flex flex-col gap-2">
            {lowStock.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-red-100">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title}
                    className="w-8 h-8 rounded-lg object-cover" />
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                </div>
                <span className="text-xs font-black text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                  {Math.max((item.stock || 0) - (item.sold || 0), 0)} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ All Products Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-black text-gray-800">Product Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-indigo-400 uppercase tracking-wider">Stock</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-green-400 uppercase tracking-wider">Sold</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-orange-400 uppercase tracking-wider">Remaining</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                const remaining = Math.max((item.stock || 0) - (item.sold || 0), 0)
                return (
                  <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title}
                          className="w-9 h-9 rounded-xl object-cover border border-gray-100" />
                        <div>
                          <p className="font-semibold text-gray-900 text-xs truncate max-w-[150px]">{item.title}</p>
                          <p className="text-[10px] text-gray-400">₹{item.price?.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-[10px] uppercase font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-full capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-sm font-black text-indigo-600">{item.stock || 0}</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-sm font-black text-green-600">{item.sold || 0}</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-sm font-black ${remaining <= 5 ? "text-red-600" : "text-orange-500"}`}>
                        {remaining}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider
                        ${item.inStock
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-200"}`}>
                        {item.inStock ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard