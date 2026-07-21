import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-50
      "
    >
      <div className="text-center">

        <h1
          className="
          text-8xl
          font-black
          text-slate-900
          "
        >
          404
        </h1>

        <h2
          className="
          text-3xl
          font-bold
          mt-4
          "
        >
          Page Not Found
        </h2>

        <p
          className="
          text-slate-500
          mt-4
          "
        >
          The page you are looking for
          doesn't exist.
        </p>

        <Link
          to="/"
          className="
          inline-block
          mt-8
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          "
        >
          Go Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;