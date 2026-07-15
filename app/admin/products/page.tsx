"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Boxes, Pencil, Trash2, Search } from "lucide-react";
import { adminApiRequest } from "@/lib/adminApi";
import { imageUrl } from "@/lib/api";
import { Product } from "@/types";

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminApiRequest("/products/admin/all")
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product permanently?")) return;
    await adminApiRequest(`/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const filtered = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
          <Boxes size={24} className="text-[#6D5EF0]" /> Manage Products
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a6]" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="rounded-xl border border-[#232733] bg-[#0b0d14] py-2 pl-9 pr-4 text-sm text-white outline-none focus:border-[#6D5EF0]"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#232733] bg-[#12141c]">
        <table className="w-full text-sm">
          <thead className="border-b border-[#232733] text-left text-xs uppercase text-[#8b92a6]">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-[#8b92a6]">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-[#8b92a6]">No products found.</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p._id} className="border-b border-[#1c1f2a] last:border-0">
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#0b0d14]">
                      {p.images?.[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageUrl(p.images[0])} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="line-clamp-1 max-w-[220px] text-white">{p.title}</span>
                  </td>
                  <td className="px-5 py-3 text-[#8b92a6]">{p.category}</td>
                  <td className="px-5 py-3 text-white">₹{p.price.toLocaleString()}</td>
                  <td className="px-5 py-3 text-[#8b92a6]">{p.stock}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.isActive ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#EF4444]/15 text-[#EF4444]"}`}>
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p._id}/edit`}
                        className="rounded-lg p-2 text-[#8b92a6] hover:bg-[#6D5EF0]/15 hover:text-[#6D5EF0]"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="rounded-lg p-2 text-[#8b92a6] hover:bg-[#EF4444]/15 hover:text-[#EF4444]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
