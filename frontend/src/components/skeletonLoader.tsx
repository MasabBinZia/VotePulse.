import { Skeleton } from "./ui/skeleton";

export default function SkeletonLoader({
  count,
  className,
}: {
  count: number;
  className: string;
}) {
  const skeletonArray = Array(count).fill(null);

  return (
    <div className="flex flex-col gap-4">
      {skeletonArray.map((_, index) => (
        <Skeleton key={index} className={className} />
      ))}
    </div>
  );
}
