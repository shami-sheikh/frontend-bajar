import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";
import toast from "react-hot-toast";

const AddProducts = ({ openProductModels, closeModals }) => {
  const { AuthorizationToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMode, setImageMode] = useState("file"); // ✅ "file" or "url"
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    imageUrl: "",
    category: "",
    categoryCustom: "",
    inStock: true,
  });

  const categories = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "accessories", label: "Accessories" },
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home" },
    { value: "beauty", label: "Beauty" },
    { value: "sports", label: "Sports" },
    { value: "books", label: "Books" },
    { value: "other", label: "Other" },
  ];

  const handleinput = (e) => {
    const { name, value, type, checked } = e.target;
    setformdata({ ...formdata, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setformdata({ ...formdata, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;

      const categoryToSend =
        formdata.category === "other" ? formdata.categoryCustom : formdata.category;

      if (imageMode === "file") {
        // ✅ File upload — use FormData
        const form = new FormData();
        form.append("title", formdata.title);
        form.append("description", formdata.description);
        form.append("price", formdata.price);
        form.append("category", categoryToSend);
        form.append("inStock", formdata.inStock);
        form.append("image", formdata.image);

        response = await fetch(
          `${API_BASE_URL}/auth/user/admin/getservice`,
          {
            method: "POST",
            headers: { Authorization: AuthorizationToken },
            body: form,
          },
        );
      } else {
        // ✅ URL — use JSON
        response = await fetch(
          `${API_BASE_URL}/auth/user/admin/getservice/url`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: AuthorizationToken,
            },
              body: JSON.stringify({
                title: formdata.title,
                description: formdata.description,
                price: formdata.price,
                category: categoryToSend,
                inStock: formdata.inStock,
                image: formdata.imageUrl,
              }),
          },
        );
      }

      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully!");
        setformdata({
          title: "",
          description: "",
          price: "",
          image: null,
          imageUrl: "",
          category: "",
          categoryCustom: "",
          inStock: true,
        });
        setImagePreview(null);
        closeModals();
      } else {
        toast.error(data.msg || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!openProductModels) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-md transition-all duration-300"
      onClick={closeModals}
    >
      <div
        className="bg-white relative border border-gray-100 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl shadow-gray-900/10 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Vector Modification */}
        <button
          onClick={closeModals}
          className="absolute top-6 right-6 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form Title Metrics */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Add New Product
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Fill in the details below to add a new item to the active inventory.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleinput}
              required
              className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
              placeholder="e.g. Nike Air Max"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formdata.description}
              onChange={handleinput}
              rows={2.5}
              required
              className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all resize-none leading-relaxed"
              placeholder="Write a brief product description detailing asset traits..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formdata.price}
                onChange={handleinput}
                required
                className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
                placeholder="999"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formdata.category}
                onChange={handleinput}
                required
                className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-gray-700"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {formdata.category === "other" && (
                <input
                  type="text"
                  name="categoryCustom"
                  value={formdata.categoryCustom}
                  onChange={handleinput}
                  required
                  placeholder="Enter custom category"
                  className="w-full mt-2 border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
                />
              )}
            </div>
          </div>

          {/* Segmented Controller Mode Switching Layout */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Image Source
            </label>
            <div className="flex bg-gray-100 p-1 rounded-xl mb-3 border border-gray-200/50">
              <button
                type="button"
                onClick={() => {
                  setImageMode("file");
                  setImagePreview(null);
                }}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all ${
                  imageMode === "file"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageMode("url");
                  setImagePreview(null);
                }}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all ${
                  imageMode === "url"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Paste URL
              </button>
            </div>

            {imageMode === "file" ? (
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full border border-gray-200 text-gray-600 rounded-xl px-4 py-2 bg-gray-50 text-xs focus:outline-none file:mr-4 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="url"
                  name="imageUrl"
                  value={formdata.imageUrl}
                  onChange={handleinput}
                  required
                  className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 bg-white text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                {formdata.imageUrl && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={formdata.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.parentNode.style.display = "none")
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Toggle Block Transformation */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/60 rounded-xl p-3.5 mt-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formdata.inStock}
              onChange={handleinput}
              id="inStock"
              className="w-4 h-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
            />
            <label
              htmlFor="inStock"
              className="text-xs font-semibold text-gray-600 cursor-pointer select-none"
            >
              Item is currently in stock and visible to clients
            </label>
          </div>

          {/* Form Trigger Processing Element */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white text-sm shadow-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2
              ${loading ? "bg-indigo-400 cursor-not-allowed shadow-none" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] hover:shadow-md hover:shadow-indigo-100"}`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Registry...
              </>
            ) : (
              "Add Product to Catalog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
