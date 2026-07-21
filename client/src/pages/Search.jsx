import { useState } from "react";

import { Search as SearchIcon, FileText, MessageSquare } from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { searchDocuments } from "../services/searchService";

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    try {
      setLoading(true);

      const data = await searchDocuments(query);

      setResults(data || []);
    } catch (error) {
      console.error(error);

      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Search Documents</h1>

          <p className="text-slate-500 mt-2">
            Search across all uploaded documents.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="
          bg-white
          border
          border-slate-200
          rounded-3xl
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
                border
                border-slate-200
                rounded-xl
                py-3
                pl-11
                pr-4
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              bg-blue-600
              text-white
              px-6
              rounded-xl
              hover:bg-blue-700
              transition
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
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6
                "
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />

                    <h3 className="font-bold">{result.fileName}</h3>
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      text-slate-600
                      "
                  >
                    {result.snippet}
                    ...
                  </p>

                  {result.summary && (
                    <p
                      className="
                        mt-4
                        text-xs
                        text-slate-500
                        "
                    >
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
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    "
                >
                  <MessageSquare size={16} />
                  Chat
                </button>
              </div>
            </div>
          ))}

          {!loading && results.length === 0 && (
            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-10
                text-center
                text-slate-500
                "
            >
              Search for keywords inside your uploaded documents.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Search;
