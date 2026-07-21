import { FileText } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left */}

        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          px-20
          bg-slate-950
          text-white
          "
        >
          <div className="max-w-lg">

            <div
              className="
              h-16
              w-16
              rounded-3xl
              bg-blue-600
              flex
              items-center
              justify-center
              mb-8
              "
            >
              <FileText size={28} />
            </div>

            <h1 className="text-5xl font-black leading-tight">
              AI Document
              Intelligence
              Platform
            </h1>

            <p className="mt-6 text-slate-400 text-lg">
              Upload, analyze, search and chat
              with your documents using AI.
            </p>

          </div>
        </div>

        {/* Right */}

        <div
          className="
          flex
          items-center
          justify-center
          px-6
          py-16
          "
        >
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold">
              {title}
            </h2>

            <p className="text-slate-500 mt-3">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;