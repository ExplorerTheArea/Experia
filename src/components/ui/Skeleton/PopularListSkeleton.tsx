'use client';

import PopularItemSkeleton from './PopularItemSkeleton';

const PopularListSkeleton = () => {
  return (
    <div className='mb-10 flex gap-4 overflow-hidden md:mb-[60px] lg:mb-[102px]'>
      <div className='min-w-0 flex-1'>
        <PopularItemSkeleton />
      </div>

      <div className='hidden min-w-0 flex-1 md:block'>
        <PopularItemSkeleton />
      </div>

      <div className='hidden min-w-0 flex-1 lg:block'>
        <PopularItemSkeleton />
      </div>
    </div>
  );
};

export default PopularListSkeleton;
