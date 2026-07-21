import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { signIn } from "../services/authService";

import {
  FileText,
  Mail,
  Lock,
  ArrowRight,
  LogIn,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    const { error } =
      await signIn(
        email,
        password
      );

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SECTION */}

      <div
        className="
        hidden
        lg:flex
        flex-col
        justify-center
        bg-slate-950
        text-white
        px-20
        "
      >
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
          <FileText size={30} />
        </div>

        <h1 className="text-5xl font-black leading-tight">
          Welcome Back To
          <br />
          DocAI Platform
        </h1>

        <p className="mt-6 text-slate-400 text-lg max-w-lg">
          Access your documents,
          AI summaries, document chat,
          semantic search and analytics
          from one intelligent workspace.
        </p>

        <div className="mt-12 space-y-5">

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={18}
              className="text-blue-500"
            />
            <span>
              Secure Authentication
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={18}
              className="text-blue-500"
            />
            <span>
              AI Powered Search
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={18}
              className="text-blue-500"
            />
            <span>
              Intelligent Document Insights
            </span>
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div
        className="
        flex
        items-center
        justify-center
        bg-slate-50
        p-6
        "
      >
        <form
          onSubmit={handleLogin}
          className="
          w-full
          max-w-md
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-10
          shadow-sm
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <LogIn
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Welcome Back
              </h2>

              <p className="text-slate-500">
                Sign in to continue
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-5">

            <div className="relative">

              <Mail
                size={18}
                className="
                absolute
                left-4
                top-4
                text-slate-400
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                w-full
                pl-12
                pr-4
                py-3
                border
                border-slate-200
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
                "
                required
              />

            </div>

            <div className="relative">

              <Lock
                size={18}
                className="
                absolute
                left-4
                top-4
                text-slate-400
                "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                w-full
                pl-12
                pr-4
                py-3
                border
                border-slate-200
                rounded-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
                "
                required
              />

            </div>

            <button
              type="submit"
              className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-2xl
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition
              "
            >
              Login

              <ArrowRight
                size={18}
              />
            </button>

          </div>

          <p className="text-center mt-6 text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
              text-blue-600
              font-medium
              "
            >
              Create Account
            </Link>

          </p>

        </form>
      </div>

    </div>
  );
}

export default Login;