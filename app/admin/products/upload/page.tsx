"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, ImagePlus, X } from "lucide-react";
import { adminApiRequest } from "@/lib/adminApi";

const CATEGORIES = [
  "Mobiles",
  "Laptops",
  "Audio",
  "Televisions",
  "Cameras",
  "Wearables",
  "Accessories",
  "Gaming",
];

export default function UploadProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
    category: "Mobiles",
    brand: "",
    stock: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.price || !form.mrp) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      images.forEach((img) => fd.append("images", img));

      await adminApiRequest("/products", { method: "POST", body: fd, isForm: true });
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        <UploadCloud size={24} className="text-[#6D5EF0]" /> Upload Product
      </h1>
      <p className="mt-1 text-sm text-[#8b92a6]">Add a new electronics item to your catalogue</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-5 rounded-2xl border border-[#232733] bg-[#12141c] p-6">
        <div>
          <label className="admin-label">Product title</label>
          <input name="title" value={form.title} onChange={handleChange} className="admin-input" placeholder="e.g. Infinix GT 30 Pro 5G+ (Dark Flare, 256GB)" />
        </div>

        <div>
          <label className="admin-label">Long description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="admin-input resize-none"
            placeholder="Full product description shown on the product page..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className="admin-label">Price (₹)</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">MRP (₹)</label>
            <input name="mrp" type="number" value={form.mrp} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Stock</label>
            <input name="stock" type="number" value={form.stock} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Brand</label>
            <input name="brand" value={form.brand} onChange={handleChange} className="admin-input" />
          </div>
        </div>

        <div>
          <label className="admin-label">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="admin-input">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="admin-label">Product images</label>
          <div className="flex flex-wrap gap-3">
            {previews.map((src, idx) => (
              <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-xl border border-[#232733]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#232733] text-[#8b92a6] hover:border-[#6D5EF0] hover:text-[#6D5EF0]">
              <ImagePlus size={20} />
              <span className="text-xs">Add</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-[#6D5EF0] to-[#4338CA] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {loading ? "Uploading..." : "Publish product"}
        </button>
      </form>

      <style jsx global>{`
        .admin-label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.8rem;
          color: #8b92a6;
        }
        .admin-input {
          width: 100%;
          border: 1px solid #232733;
          background: #0b0d14;
          color: #e6e8f0;
          border-radius: 0.75rem;
          padding: 0.7rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .admin-input:focus {
          border-color: #6d5ef0;
        }
      `}</style>
    </div>
  );
}
