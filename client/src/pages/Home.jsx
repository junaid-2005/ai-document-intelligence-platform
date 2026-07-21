// Home.jsx
// PART 1
// Replace everything from the imports until just BEFORE <section id="features">

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Upload,
  ShieldCheck,
  FileText,
  Search,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section
        id="home"
        className="
        relative
        overflow-hidden
        bg-white
        pt-36
        pb-32
        "
      >
        <div className="absolute inset-0 -z-30 bg-white" />

        <div
          className="
          absolute
          inset-0
          -z-20
          bg-[radial-gradient(circle_at_top,rgba(59,130,246,.08),transparent_60%)]
          "
        />

        <div
          className="
          absolute
          inset-0
          -z-20
          bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)]
          bg-size-[64px_64px]
          "
        />

        <div
          className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          gap-20
          px-6
          lg:flex-row
          lg:px-8
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-5
              py-2
              text-sm
              font-semibold
              text-blue-700
              "
            >
              <Sparkles size={16} />
              AI Powered Document Intelligence
            </div>

            <h1
              className="
              mt-8
              max-w-3xl
              text-5xl
              font-black
              leading-[1.05]
              tracking-tight
              text-slate-900
              md:text-6xl
              xl:text-7xl
              "
            >
              Understand Your
              <span className="block text-blue-600">PDF Documents</span>
              With AI
            </h1>

            <p
              className="
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
              "
            >
              Securely upload PDF documents, generate AI-powered summaries,
              organize files, browse document history and manage everything from
              one modern dashboard.
            </p>

            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-4
              "
            >
              <Link
                to="/register"
                className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-slate-900
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-800
                "
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="
                rounded-2xl
                border
                border-slate-300
                px-8
                py-4
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
                "
              >
                Explore Features
              </a>
            </div>

            <div
              className="
              mt-14
              grid
              gap-5
              sm:grid-cols-2
              "
            >
              {[
                "Secure Authentication",
                "PDF Upload",
                "AI Summaries",
                "Dashboard",
              ].map((item) => (
                <div
                  key={item}
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <CheckCircle2 size={20} className="text-blue-600" />

                  <span
                    className="
                    text-slate-700
                    font-medium
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1"
          >
            <div
              className="
              rounded-[34px]
              border
              border-slate-200
              bg-white
              p-7
              shadow-[0_30px_90px_rgba(15,23,42,.08)]
              "
            >
              <div
                className="
                flex
                items-center
                justify-between
                "
              >
                <div>
                  <p className="text-sm text-slate-500">Dashboard</p>

                  <h3
                    className="
                    mt-1
                    text-2xl
                    font-bold
                    text-slate-900
                    "
                  >
                    Recent Documents
                  </h3>
                </div>

                <div
                  className="
                  rounded-2xl
                  bg-blue-100
                  p-4
                  "
                >
                  <LayoutDashboard className="text-blue-600" size={24} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {[
                  "Research_Paper.pdf",
                  "Project_Report.pdf",
                  "Meeting_Minutes.pdf",
                ].map((file) => (
                  <div
                    key={file}
                    className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                        rounded-xl
                        bg-blue-50
                        p-3
                        "
                      >
                        <FileText size={22} className="text-blue-600" />
                      </div>

                      <div>
                        <p
                          className="
                          font-semibold
                          text-slate-900
                          "
                        >
                          {file}
                        </p>

                        <p
                          className="
                          text-sm
                          text-slate-500
                          "
                        >
                          AI Summary Ready
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-700
                      "
                    >
                      Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="
              absolute
              -left-8
              top-16
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-xl
              "
            >
              <Upload className="text-blue-600" size={24} />

              <p
                className="
                mt-3
                text-sm
                text-slate-500
                "
              >
                Upload Status
              </p>

              <h4
                className="
                mt-1
                font-bold
                text-slate-900
                "
              >
                PDF Uploaded
              </h4>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="
              absolute
              -right-8
              bottom-12
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-xl
              "
            >
              <BrainCircuit className="text-indigo-600" size={24} />

              <p
                className="
                mt-3
                text-sm
                text-slate-500
                "
              >
                Gemini AI
              </p>

              <h4
                className="
                mt-1
                font-bold
                text-slate-900
                "
              >
                Summary Generated
              </h4>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section
        id="features"
        className="
        relative
        overflow-hidden
        bg-slate-50
        py-32
        "
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.05),transparent_45%)]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span
              className="
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2
              text-sm
              font-semibold
              text-blue-700
              "
            >
              FEATURES
            </span>

            <h2
              className="
              mt-8
              text-5xl
              font-black
              tracking-tight
              text-slate-900
              "
            >
              Everything You Need
              <br />
              To Manage PDF Documents
            </h2>

            <p
              className="
              mt-8
              text-lg
              leading-8
              text-slate-600
              "
            >
              Every feature below already exists or is being built in DocAI. No
              marketing hype. Just practical AI document management.
            </p>
          </motion.div>

          <div
            className="
            mt-20
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
            "
          >
            {[
              {
                icon: ShieldCheck,
                title: "Secure Authentication",
                text: "User registration, login and protected dashboard using Supabase Authentication.",
              },
              {
                icon: Upload,
                title: "PDF Upload",
                text: "Upload PDF documents securely with cloud storage integration.",
              },
              {
                icon: BrainCircuit,
                title: "AI Summaries",
                text: "Generate intelligent document summaries using Gemini AI.",
              },
              {
                icon: Search,
                title: "Document Search",
                text: "Quickly search uploaded documents from one centralized dashboard.",
              },
              {
                icon: LayoutDashboard,
                title: "Dashboard",
                text: "Monitor uploads, recent activity and manage all your documents.",
              },
              {
                icon: FileText,
                title: "Document History",
                text: "Access previously uploaded documents and generated summaries.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.25 },
                  }}
                  className="
                  group
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  hover:border-blue-100
                  hover:shadow-2xl
                  "
                >
                  <div
                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    transition-all
                    group-hover:bg-blue-600
                    "
                  >
                    <Icon
                      size={30}
                      className="
                      text-blue-600
                      transition-all
                      group-hover:text-white
                      "
                    />
                  </div>

                  <h3
                    className="
                    mt-8
                    text-2xl
                    font-bold
                    text-slate-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                    mt-5
                    leading-8
                    text-slate-600
                    "
                  >
                    {item.text}
                  </p>

                  <div
                    className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-blue-600
                    "
                  >
                    Available
                    <CheckCircle2 size={18} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="workflow"
        className="
        relative
        overflow-hidden
        bg-white
        py-32
        "
      >
        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,.05),transparent_45%)]
          "
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span
              className="
              rounded-full
              border
              border-indigo-200
              bg-indigo-50
              px-5
              py-2
              text-sm
              font-semibold
              text-indigo-700
              "
            >
              HOW IT WORKS
            </span>

            <h2
              className="
              mt-8
              text-5xl
              font-black
              tracking-tight
              text-slate-900
              "
            >
              Simple Workflow,
              <br />
              Intelligent Results
            </h2>

            <p
              className="
              mx-auto
              mt-8
              max-w-3xl
              text-lg
              leading-8
              text-slate-600
              "
            >
              Upload a PDF and let DocAI organize it, generate AI summaries, and
              keep everything accessible from one clean workspace.
            </p>
          </motion.div>

          <div className="relative mt-24">
            <div
              className="
              absolute
              left-1/2
              top-0
              hidden
              h-full
              w-px
              -translate-x-1/2
              bg-slate-200
              lg:block
              "
            />

            {[
              {
                number: "01",
                title: "Upload PDF",
                desc: "Upload a PDF document securely into your workspace.",
                icon: Upload,
              },
              {
                number: "02",
                title: "AI Processing",
                desc: "Gemini generates a document summary and stores metadata.",
                icon: BrainCircuit,
              },
              {
                number: "03",
                title: "Manage Documents",
                desc: "View uploaded files, organize them and access history.",
                icon: LayoutDashboard,
              },
              {
                number: "04",
                title: "Find Information",
                desc: "Search documents quickly and retrieve previous summaries.",
                icon: Search,
              },
            ].map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  className={`
                    relative
                    mb-16
                    flex
                    flex-col
                    items-center
                    gap-8
                    lg:flex-row
                    ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}
                  `}
                >
                  <div className="flex-1">
                    <div
                      className="
                      rounded-4xl
                      border
                      border-slate-200
                      bg-white
                      p-8
                      shadow-sm
                      transition
                      hover:shadow-xl
                      "
                    >
                      <div
                        className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-50
                        "
                      >
                        <Icon size={30} className="text-blue-600" />
                      </div>

                      <p
                        className="
                        mt-8
                        text-sm
                        font-bold
                        tracking-widest
                        text-blue-600
                        "
                      >
                        STEP {step.number}
                      </p>

                      <h3
                        className="
                        mt-3
                        text-3xl
                        font-bold
                        text-slate-900
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                        mt-5
                        text-lg
                        leading-8
                        text-slate-600
                        "
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                    z-10
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border-8
                    border-white
                    bg-blue-600
                    text-2xl
                    font-black
                    text-white
                    shadow-xl
                    "
                  >
                    {step.number}
                  </div>

                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="
        bg-slate-50
        py-32
        "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="
            grid
            items-center
            gap-20
            lg:grid-cols-2
            "
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-5
                py-2
                text-sm
                font-semibold
                text-blue-700
                "
              >
                ABOUT DOCAI
              </span>

              <h2
                className="
                mt-8
                text-5xl
                font-black
                leading-tight
                text-slate-900
                "
              >
                A Modern Platform
                <br />
                For Understanding PDF Documents
              </h2>

              <p
                className="
                mt-8
                text-lg
                leading-8
                text-slate-600
                "
              >
                DocAI is designed to simplify document management using
                artificial intelligence. Upload PDFs, generate summaries,
                organize files and retrieve information from a clean, responsive
                dashboard.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Secure authentication",
                  "Cloud document storage",
                  "AI-generated summaries",
                  "Modern responsive dashboard",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                    flex
                    items-center
                    gap-4
                    "
                  >
                    <CheckCircle2 size={22} className="text-blue-600" />

                    <span
                      className="
                      text-lg
                      text-slate-700
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="
              rounded-[36px]
              border
              border-slate-200
              bg-white
              p-10
              shadow-xl
              "
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Platform Overview
                  </h3>

                  <BrainCircuit size={28} className="text-blue-600" />
                </div>

                <div className="space-y-6">
                  {[
                    ["Authentication", "Implemented"],
                    ["PDF Upload", "Implemented"],
                    ["AI Summary", "Implemented"],
                    ["Dashboard", "Implemented"],
                    ["Search", "Available"],
                    ["History", "Available"],
                  ].map((row) => (
                    <div
                      key={row[0]}
                      className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-slate-100
                      pb-4
                      "
                    >
                      <span className="font-medium text-slate-700">
                        {row[0]}
                      </span>

                      <span
                        className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-green-700
                        "
                      >
                        {row[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section
        id="stats"
        className="
  bg-slate-50
  py-28
  "
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span
              className="
        rounded-full
        border
        border-blue-200
        bg-white
        px-4
        py-2
        text-sm
        font-semibold
        text-blue-700
        "
            >
              PLATFORM CAPABILITIES
            </span>

            <h2
              className="
        mt-6
        text-4xl
        font-black
        text-slate-900
        "
            >
              Built Around Your Current Platform
            </h2>

            <p
              className="
        mt-5
        text-lg
        text-slate-600
        max-w-3xl
        mx-auto
        "
            >
              Every capability below already exists or is being processed inside
              your current application architecture.
            </p>
          </motion.div>

          <div
            className="
      mt-16
      grid
      gap-8
      md:grid-cols-2
      lg:grid-cols-4
      "
          >
            {[
              {
                title: "Secure Authentication",
                value: "Supabase",
                text: "Authentication and protected user access.",
              },
              {
                title: "Document Upload",
                value: "PDF",
                text: "Upload and securely store PDF documents.",
              },
              {
                title: "AI Summaries",
                value: "Gemini",
                text: "Generate summaries using Google Gemini.",
              },
              {
                title: "Semantic Search",
                value: "Vector",
                text: "Embedding based document retrieval.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
          "
              >
                <h3
                  className="
            text-3xl
            font-black
            text-blue-600
            "
                >
                  {item.value}
                </h3>

                <p
                  className="
            mt-4
            text-lg
            font-bold
            text-slate-900
            "
                >
                  {item.title}
                </p>

                <p
                  className="
            mt-3
            text-slate-500
            leading-7
            "
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="about"
        className="
  relative
  overflow-hidden
  bg-slate-900
  py-32
  "
      >
        <div
          className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.22),transparent_45%)]
    "
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div
            className="
      grid
      items-center
      gap-16
      lg:grid-cols-2
      "
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="
          inline-flex
          rounded-full
          border
          border-blue-500/30
          bg-blue-500/10
          px-4
          py-2
          text-sm
          font-semibold
          text-blue-300
          "
              >
                ABOUT DOCAI
              </span>

              <h2
                className="
          mt-8
          text-5xl
          font-black
          leading-tight
          text-white
          "
              >
                Built to simplify
                <br />
                document intelligence.
              </h2>

              <p
                className="
          mt-8
          max-w-xl
          text-lg
          leading-8
          text-slate-300
          "
              >
                DocAI is an AI-powered document intelligence platform designed
                to upload PDF documents, generate intelligent summaries, perform
                semantic search and interact with documents through natural
                language. Built using React, Express, Supabase and Google
                Gemini.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="
        rounded-4xl
        border
        border-white/10
        bg-white/5
        p-10
        backdrop-blur-xl
        "
            >
              <h3
                className="
          text-3xl
          font-bold
          text-white
          "
              >
                Start using DocAI
              </h3>

              <p
                className="
          mt-4
          leading-8
          text-slate-300
          "
              >
                Create your account, upload your first PDF and experience
                AI-powered document understanding.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/register"
                  className="
            rounded-xl
            bg-blue-600
            px-7
            py-4
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            "
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  className="
            rounded-xl
            border
            border-slate-500
            px-7
            py-4
            font-semibold
            text-white
            transition
            hover:bg-white/10
            "
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="
        relative
        overflow-hidden
        bg-slate-900
        py-32
        "
      >
        ...
      </section>
    </>
  );
}

export default Home;
