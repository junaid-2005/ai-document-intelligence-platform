function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-pulse">
          <div className="h-12 w-72 rounded-xl bg-slate-200" />

          <div className="mt-5 h-5 w-125 rounded bg-slate-200" />

          <div className="mt-3 h-5 w-95 rounded bg-slate-100" />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                "
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-200" />

                <div className="mt-8 h-6 w-2/3 rounded bg-slate-200" />

                <div className="mt-6 h-4 rounded bg-slate-100" />

                <div className="mt-3 h-4 rounded bg-slate-100" />

                <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
