import {
  FileText,
  Trash2,
  MessageSquare,
  Eye,
  Calendar,
  HardDrive,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function DocumentsTable({
  documents,
  onDelete,
}) {
  const navigate =
    useNavigate();

  if (!documents.length)
    return null;

  return (
    <>
      {/* Desktop */}

      <div
        className="
        hidden
        lg:block
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        "
      >
        <div
          className="
          grid
          grid-cols-12
          border-b
          border-slate-200
          bg-slate-50
          px-6
          py-4
          text-sm
          font-semibold
          text-slate-600
          "
        >
          <div className="col-span-4">
            Document
          </div>

          <div className="col-span-2">
            Uploaded
          </div>

          <div className="col-span-2">
            Size
          </div>

          <div className="col-span-2">
            AI Status
          </div>

          <div className="col-span-2 text-right">
            Actions
          </div>
        </div>

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="
            grid
            grid-cols-12
            items-center
            border-b
            border-slate-100
            px-6
            py-5
            transition
            hover:bg-slate-50
            "
          >
            <div className="col-span-4 flex items-center gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                "
              >
                <FileText
                  className="text-blue-600"
                  size={20}
                />
              </div>

              <div>

                <h3 className="font-semibold text-slate-900">
                  {doc.file_name}
                </h3>

                <p className="text-sm text-slate-500">
                  PDF Document
                </p>

              </div>

            </div>

            <div className="col-span-2 text-sm text-slate-600">
              {new Date(
                doc.created_at
              ).toLocaleDateString()}
            </div>

            <div className="col-span-2 text-sm text-slate-600">
              {doc.file_size
                ? `${(
                    doc.file_size /
                    1024 /
                    1024
                  ).toFixed(2)} MB`
                : "--"}
            </div>

            <div className="col-span-2">

              {doc.summary ? (
                <span
                  className="
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                  "
                >
                  Ready
                </span>
              ) : (
                <span
                  className="
                  rounded-full
                  bg-yellow-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-yellow-700
                  "
                >
                  Processing
                </span>
              )}

            </div>

            <div className="col-span-2 flex justify-end gap-2">

              <button
                onClick={() =>
                  window.open(
                    doc.file_url,
                    "_blank"
                  )
                }
                className="
                rounded-xl
                p-2.5
                text-green-600
                transition
                hover:bg-green-50
                "
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/workspace?doc=${doc.id}`
                  )
                }
                className="
                rounded-xl
                p-2.5
                text-blue-600
                transition
                hover:bg-blue-50
                "
              >
                <MessageSquare
                  size={18}
                />
              </button>

              <button
                onClick={() =>
                  onDelete(doc.id)
                }
                className="
                rounded-xl
                p-2.5
                text-red-600
                transition
                hover:bg-red-50
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                "
              >
                <FileText
                  className="text-blue-600"
                  size={20}
                />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold break-all">
                  {doc.file_name}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <Calendar size={15} />
                    {new Date(
                      doc.created_at
                    ).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <HardDrive size={15} />
                    {doc.file_size
                      ? `${(
                          doc.file_size /
                          1024 /
                          1024
                        ).toFixed(2)} MB`
                      : "--"}
                  </div>

                </div>

                <div className="mt-4">

                  {doc.summary ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Ready
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Processing
                    </span>
                  )}

                </div>

              </div>

            </div>

            <div className="mt-5 flex justify-end gap-3">

              <button
                onClick={() =>
                  window.open(
                    doc.file_url,
                    "_blank"
                  )
                }
                className="rounded-xl bg-green-50 p-3 text-green-600"
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/workspace?doc=${doc.id}`
                  )
                }
                className="rounded-xl bg-blue-50 p-3 text-blue-600"
              >
                <MessageSquare
                  size={18}
                />
              </button>

              <button
                onClick={() =>
                  onDelete(doc.id)
                }
                className="rounded-xl bg-red-50 p-3 text-red-600"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default DocumentsTable;