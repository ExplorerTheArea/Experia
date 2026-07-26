'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BREAKPOINTS, POPULAR_ACTIVITIES_VIEW_COUNT } from '@/constants';
import { PopularActivities } from '@/types/schema/activitiesSchema';
import { InfiniteData } from '@tanstack/react-query';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PopularItem from './PopularItem';

interface PopularListProps {
  data: InfiniteData<PopularActivities, string | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const PopularList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PopularListProps) => {
  const isFetchingMore = hasNextPage && isFetchingNextPage;

  return (
    <div className='relative'>
      <Swiper
        className='w-full'
        slidesPerView={POPULAR_ACTIVITIES_VIEW_COUNT.sm}
        spaceBetween={16}
        breakpoints={{
          [BREAKPOINTS.md]: {
            slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.md,
          },
          [BREAKPOINTS.lg]: {
            slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.lg,
          },
        }}
        navigation
        grabCursor
        modules={[Navigation]}
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {data.pages.map(page =>
          page.activities.map(activity => (
            <SwiperSlide key={activity.id}>
              <PopularItem item={activity} />
            </SwiperSlide>
          )),
        )}

        {isFetchingMore && (
          <SwiperSlide>
            <div className='flex aspect-square w-full items-center justify-center'>
              <LoadingSpinner />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default PopularList;
