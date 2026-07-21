import {
  MailCheck,
} from "lucide-react";

function VerifyEmail() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-50
      p-6
      "
    >
      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-10
        max-w-lg
        text-center
        shadow-sm
        "
      >
        <div
          className="
          h-20
          w-20
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          mx-auto
          "
        >
          <MailCheck
            size={40}
            className="text-blue-600"
          />
        </div>

        <h1
          className="
          text-3xl
          font-bold
          mt-6
          "
        >
          Check Your Inbox
        </h1>

        <p
          className="
          text-slate-500
          mt-4
          "
        >
          We've sent a verification
          email to your email address.
        </p>

        <p
          className="
          text-slate-500
          mt-2
          "
        >
          Please verify your account
          before logging in.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;