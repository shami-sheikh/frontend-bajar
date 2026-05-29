import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";
import toast from "react-hot-toast";

function Updateproductmodals({ closeupdate, openupdatemodels, selectedproduct, getAllProducts }) {
  const { AuthorizationToken } = useAuth()
  const [imageMode, setImageMode] = useState("url")  // ✅ "url" or "file"
  const [imagePreview, setImagePreview] = useState(null)
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    inStock: true,
    image: "",
    imageFile: null,
  })

  useEffect(() => {
    if (selectedproduct) {
      setformdata({
        title: selectedproduct.title || "",
        description: selectedproduct.description || "",
        price: selectedproduct.price || "",
        category: selectedproduct.category || "",
        inStock: selectedproduct.inStock ?? true,
        image: selectedproduct.image || "",
        imageFile: null,
      })
      setImagePreview(selectedproduct.image || null)
      setImageMode("url")
    }
  }, [selectedproduct])

  if (!openupdatemodels || !selectedproduct) return null

  const handleinput = (e) => {
    const { name, value, type, checked } = e.target
    setformdata({ ...formdata, [name]: type === "checkbox" ? checked : value })
  }

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setformdata({ ...formdata, imageFile: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const updateProduct = async () => {
    try {
      let response

      if (imageMode === "file" && formdata.imageFile) {
        // ✅ File upload — use FormData
        const form = new FormData()
        form.append("title", formdata.title)
        form.append("description", formdata.description)
        form.append("price", formdata.price)
        form.append("category", formdata.category)
        form.append("inStock", formdata.inStock)
        form.append("image", formdata.imageFile)

        response = await fetch(
          `${API_BASE_URL}/auth/user/admin/updateproduct/${selectedproduct._id}`,
          {
            method: "PUT",
            headers: { Authorization: AuthorizationToken },
            body: form,
          }
        )
      } else {
        // ✅ URL or no image change — use JSON
        response = await fetch(
          `${API_BASE_URL}/auth/user/admin/updateproduct/${selectedproduct._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: AuthorizationToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: formdata.title,
              description: formdata.description,
              price: Number(formdata.price),
              category: formdata.category,
              inStock: formdata.inStock,
              image: formdata.image,
            })
          }
        )
      }

      const data = await response.json()
      if (response.ok) {
        toast.success("Product updated ✅")
        getAllProducts()
        closeupdate()
      } else {
        toast.error(data.msg || "Failed to update")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-md"
      onClick={closeupdate}>
      <div className="bg-white relative border border-gray-100 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button onClick={closeupdate}
          className="absolute top-6 right-6 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
          <p className="text-sm text-gray-400 mt-1">Update the details below</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" name="title" value={formdata.title} onChange={handleinput}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
              placeholder="Product title" />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea name="description" value={formdata.description} onChange={handleinput} rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all resize-none"
              placeholder="Product description" />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Price (₹)</label>
              <input type="number" name="price" value={formdata.price} onChange={handleinput}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
                placeholder="999" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Category</label>
              <select name="category" value={formdata.category} onChange={handleinput}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all">
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* ✅ Image Section */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Image</label>

            {/* Toggle */}
            <div className="flex gap-2 mb-3">
              <button type="button"
                onClick={() => { setImageMode("url"); setImagePreview(formdata.image || null) }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all
                  ${imageMode === "url" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                Paste URL
              </button>
              <button type="button"
                onClick={() => { setImageMode("file"); setImagePreview(null) }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all
                  ${imageMode === "file" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                Upload File
              </button>
            </div>

            {imageMode === "url" ? (
              <input type="url" name="image" value={formdata.image} onChange={handleinput}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
                placeholder="https://example.com/image.jpg" />
            ) : (
              <input type="file" accept="image/*" onChange={handleImageFile}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all" />
            )}

            {/* ✅ Preview */}
            {imagePreview && (
              <img src={imagePreview} alt="Preview"
                className="mt-3 h-40 w-full object-cover rounded-xl border border-gray-200"
                onError={(e) => e.target.style.display = "none"} />
            )}
          </div>

          {/* inStock */}
          <div className="flex items-center gap-3">
            <input type="checkbox" name="inStock" id="inStock"
              checked={formdata.inStock} onChange={handleinput}
              className="w-4 h-4 accent-indigo-600" />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-600 cursor-pointer">In Stock</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={closeupdate}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button onClick={updateProduct}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Updateproductmodals