export function LessonLoadingSkeleton() {
  return (
    <div className="min-h-screen pb-24 bg-slate-50/50 dark:bg-slate-950 animate-pulse">
      {/* Top sticky breadcrumb bar skeleton */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="h-4 w-56 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-28 rounded-xl bg-indigo-500/20" />
          </div>
        </div>
      </div>

      {/* Main textbook container skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-9 max-w-4xl space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="h-4 w-32 rounded bg-indigo-500/20" />
            <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/80" />
              <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800/80" />
              <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800/80" />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-32 w-full rounded-xl bg-slate-100 dark:bg-slate-800/60" />
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="h-5 w-52 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-48 w-full rounded-xl bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
