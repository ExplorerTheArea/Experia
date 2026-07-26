'use client';

import { POPULAR_ACTIVITIES_COUNT } from '@/constants';
import { Activities, PopularActivities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import PopularList from './PopularList.client';

const PopularPageClient = ({ initialData }: { initialData: Activities }) => {
  const sortOrder = 'most_reviewed';
  const pageSize = POPULAR_ACTIVITIES_COUNT;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery<
      PopularActivities,
      Error,
      InfiniteData<PopularActivities, string | null>,
      [string, string, number],
      string | null | number
    >({
      queryKey: ['popularActivities', sortOrder, pageSize],

      queryFn: ({ pageParam = null }) =>
        fetchServerData<PopularActivities>({
          path: '/activities',
          query: {
            method: 'cursor',
            size: pageSize,
            cursorId: pageParam ?? undefined,
            sort: sortOrder,
          },
        }),

      initialPageParam: null,

      initialData: {
        pages: [initialData],
        pageParams: [null],
      },

      getNextPageParam: lastPage =>
        lastPage.activities.length > 0 ? lastPage.cursorId : undefined,
    });

  if (isError) {
    return <div>목록 불러오기에 실패했습니다.</div>;
  }

  return (
    <div className='mb-10 md:mb-[60px] lg:mb-[102px]'>
      <PopularList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default PopularPageClient;
