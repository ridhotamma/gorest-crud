import React from "react";

type Props = {
    row: number
}

const SkeletonLoader = ({ row }: Props) => {
  return (
    <div role="status" className="w-full py-4 px-10 space-y-4 divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
      {[...Array(row)].map((_, index) => (
        <div key={index} className="flex gap-10 items-center justify-between pt-4">
          <div className="w-full">
            <div className="h-6 bg-gray-200 rounded-full w-full mb-2.5"></div>
            <div className="w-full h-6 bg-gray-100 rounded-full"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
