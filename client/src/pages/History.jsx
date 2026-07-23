import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getHistory } from "../services/historyService";

import { MessageSquare } from "lucide-react";

function History() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await getHistory();

      setHistory(history);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Chat History</h1>

          <p className="text-slate-500 mt-2">
            View all previous AI conversations.
          </p>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : history.length === 0 ? (
          <div
            className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-12
            text-center
            "
          >
            <h2 className="text-2xl font-bold">No History Yet</h2>

            <p className="text-slate-500 mt-2">
              Start chatting with a document to create history.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-6
                  shadow-sm
                  "
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={20} />

                  <span className="font-semibold">
                    {item.documents?.file_name}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Question</p>

                  <p className="text-slate-700 mt-1">{item.question}</p>
                </div>

                <div>
                  <p className="font-semibold">Answer</p>

                  <p className="text-slate-700 mt-1 whitespace-pre-wrap">
                    {item.answer}
                  </p>
                </div>

                <div
                  className="
                    mt-5
                    text-sm
                    text-slate-500
                    "
                >
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default History;
