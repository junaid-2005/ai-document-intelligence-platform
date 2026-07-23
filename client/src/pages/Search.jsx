import { useState, useEffect } from "react";
import { Search as SearchIcon, FileText, MessageSquare } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { searchDocuments } from "../services/searchService";

function Search() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const data = await searchDocuments(searchQuery);

      setResults(data.results || []);
    } catch (error) {
      console.error(error);

      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";

    setQuery(q);

    if (q.trim()) {
      performSearch(q);
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setSearchParams({
      q: query,
    });

    performSearch(query);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Search Documents</h1>

          <p className="mt-2 text-slate-500">
            Search across all uploaded documents.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          "
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <SearchIcon
                size={18}
                className="
                absolute
                left-4
                top-4
                text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search text inside documents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
                w-full
                rounded-xl
                border
                border-slate-200
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              rounded-xl
              bg-blue-600
              px-6
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-60
              "
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.documentId}
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />

                    <h3 className="font-bold">{result.fileName}</h3>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">
                    {result.snippet}...
                  </p>

                  {result.summary && (
                    <p className="mt-4 text-xs text-slate-500">
                      Summary Available
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/ai-chat/${result.documentId}`)}
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-white
                  hover:bg-blue-700
                  "
                >
                  <MessageSquare size={16} />
                  Chat
                </button>
              </div>
            </div>
          ))}

          {!loading && results.length === 0 && !query && (
            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-10
                text-center
                text-slate-500
                "
            >
              Search for keywords inside your uploaded documents.
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-10
                text-center
                text-slate-500
                "
            >
              No matching results found.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Search;
