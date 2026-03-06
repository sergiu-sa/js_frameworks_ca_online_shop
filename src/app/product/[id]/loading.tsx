import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
          <div>
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="mt-3 h-5 w-28" />
          </div>
          <Skeleton className="h-7 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-12 w-full sm:w-40" />
            <Skeleton className="h-12 w-full sm:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
