// 'use client';

// import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import { BREAKPOINTS, POPULAR_ACTIVITIES_VIEW_COUNT } from '@/constants';
// import { PopularActivities } from '@/types/schema/activitiesSchema';
// import { InfiniteData } from '@tanstack/react-query';
// import { Navigation } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import PopularItem from './PopularItem';

// interface PopularListProps {
//   data: InfiniteData<PopularActivities, string | null>;
//   fetchNextPage: () => void;
//   hasNextPage: boolean;
//   isFetchingNextPage: boolean;
// }

// const PopularList = ({
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// }: PopularListProps) => {
//   const isFetchingMore = hasNextPage && isFetchingNextPage;
//   return (
//     <div className='relative w-full overflow-hidden'>
//       <Swiper
//         className='w-full'
//         slidesPerView={POPULAR_ACTIVITIES_VIEW_COUNT.sm} // 모바일 기본
//         observer
//         observeParents
//         resizeObserver
//         spaceBetween={16} // 슬라이드 간격
//         breakpoints={{
//           [BREAKPOINTS.md]: { slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.md }, // 720px 이상
//           [BREAKPOINTS.lg]: { slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.lg }, // 1280px 이상
//         }}
//         navigation // 좌우 버튼
//         grabCursor // 마우스 드래그 가능
//         modules={[Navigation]} // Swiper 모듈 등록
//         onReachEnd={() => {
//           if (hasNextPage) fetchNextPage();
//         }}
//       >
//         {data.pages.map(page =>
//           page.activities.map((activity, i) => (
//             <SwiperSlide key={activity.id} className='!h-auto'>
//               <PopularItem item={activity} idx={i} />
//             </SwiperSlide>
//           )),
//         )}
//         {isFetchingMore && (
//           <SwiperSlide className='flex w-auto items-center justify-center'>
//             <LoadingSpinner />
//           </SwiperSlide>
//         )}
//       </Swiper>
//     </div>
//   );
// };

// export default PopularList;

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
