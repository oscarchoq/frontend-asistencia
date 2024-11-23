import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col pb-8">
        <div className="space-y-2">
          <Skeleton className="h-6 max-w-60" />
          <Skeleton className="h-4 max-w-md" />
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 14 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 max-w-36" />
            <Skeleton className="h-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSkeleton;
