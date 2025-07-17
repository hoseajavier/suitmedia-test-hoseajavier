import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchIdeas } from "../services/ideasService";

export default function Ideas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const sort = searchParams.get("sort") || "-published_at";

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadIdeas = async () => {
      setLoading(true);
      try {
        const result = await fetchIdeas({ page, size, sort });
        setData(result.data.data);
        setTotal(result.data.meta.total);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [page, size, sort]);

  const totalPages = Math.ceil(total / size);

  const updateParam = (key, value) => {
    const newParams = {
      ...Object.fromEntries(searchParams),
      [key]: value,
      ...(key !== "page" && { page: 1 }),
    };
    setSearchParams(newParams);
  };

  const getPaginationRange = (current, total) => {
    const delta = 1;
    const range = [];
    const showPages = 5;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    for (let i = 1; i <= Math.min(showPages, total); i++) {
      range.push(i);
    }

    if (current > showPages + 1 && total > showPages + 2) {
      range.push("...");
    }

    if (current > showPages && current < total - 1) {
      range.push(current);
    }

    if (current < total - 2 && total > showPages + 2) {
      range.push("...");
    }

    if (!range.includes(total)) {
      range.push(total);
    }

    return range;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Showing Text */}
        <div className="text-gray-700 text-[17px]">
          Showing {(page - 1) * size + 1} - {Math.min(page * size, total)} of{" "}
          {total}
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-6">
          {/* Show per page */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-[17px]">Show per page:</span>
            <select
              value={size}
              onChange={(e) => updateParam("size", e.target.value)}
              className="text-[17px] font-semibold bg-white border border-gray-300 rounded-full px-4 py-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-[17px]">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="text-[17px] font-semibold bg-white border border-gray-300 rounded-full px-4 py-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-60 w-full">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={post.small_image?.url ?? ""}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-2 uppercase">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <h3
                  className="text-sm font-semibold text-gray-800 leading-snug"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <nav className="flex justify-center mt-10 gap-2 flex-wrap">
        {/* First */}
        <button
          disabled={page === 1}
          onClick={() => updateParam("page", 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 bg-gray-100 text-gray-600 disabled:opacity-40 cursor-pointer"
        >
          &laquo;
        </button>

        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => updateParam("page", page - 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 bg-gray-100 text-gray-600 disabled:opacity-40 cursor-pointer"
        >
          &lsaquo;
        </button>

        {getPaginationRange(page, totalPages).map((p, idx) =>
          p === "..." ? (
            <span
              key={idx}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => updateParam("page", p)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                p === page
                  ? "bg-orange-500 text-white cursor-pointer"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => updateParam("page", page + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 bg-gray-100 text-gray-600 disabled:opacity-40 cursor-pointer"
        >
          &rsaquo;
        </button>

        {/* Last */}
        <button
          disabled={page === totalPages}
          onClick={() => updateParam("page", totalPages)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 bg-gray-100 text-gray-600 disabled:opacity-40 cursor-pointer"
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
}
