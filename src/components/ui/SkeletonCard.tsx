export function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
      <div className="aspect-[3/4] w-full bg-slate-700 skeleton" />
      <div className="p-4">
        <div className="h-6 bg-slate-700 rounded mb-2 skeleton" />
        <div className="h-4 bg-slate-700 rounded mb-4 skeleton w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-700 rounded skeleton w-16" />
          <div className="h-4 bg-slate-700 rounded skeleton w-20" />
        </div>
      </div>
    </div>
  )
}