export default function AdminQrLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-2xl bg-muted" />
    </div>
  )
}
