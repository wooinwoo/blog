export default function BlogLoading() {
  return (
    <div className="py-24 space-y-8">
      <div className="h-8 w-48 bg-muted animate-pulse rounded-lg" />
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border bg-card/50 space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded-full" />
              <div className="h-6 w-3/4 bg-muted rounded-lg" />
            </div>
            <div className="h-4 w-full bg-muted rounded-lg" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
