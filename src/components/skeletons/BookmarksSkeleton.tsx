export function BookmarksSkeleton() {
  const skeletonItems = [];
  for (let i = 0; i < 6; i++) {
    skeletonItems.push(i);
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl font-semibold my-4 text-text-primary">My Bookmarks</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {skeletonItems.map((i) => (
          <div key={i} className="bg-surface rounded-lg animate-pulse">
            <div className="aspect-[2/3] w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
