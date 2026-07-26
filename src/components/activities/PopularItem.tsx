import { Activity } from '@/types/schema/activitiesSchema';
import formatRating from '@/utils/formatter/formatRating';
import Image from 'next/image';
import Link from 'next/link';

const PopularItem = ({ item }: { item: Activity }) => {
  return (
    <Link
      href={`/activities/${item.id}`}
      className='group relative block aspect-square w-full overflow-hidden rounded-[20px]'
    >
      <Image src={item.bannerImageUrl} alt={item.title} fill className='object-cover' />

      {/* hover 시 썸네일 dimmed 처리 */}
      <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100'></div>

      {/* 이미지 위 텍스트 오버레이 */}
      <div className='absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-5'>
        <span className='text-md flex items-center gap-1 font-semibold text-white'>
          <Image src='/icons/ic_StarSmall.svg' alt='별점' width={18} height={18} />
          {formatRating(item.rating)}
          <span className='text-gray-200'>(리뷰 {item.reviewCount}개)</span>
        </span>

        <h3 className='overflow-hidden text-lg font-semibold overflow-ellipsis whitespace-nowrap text-white md:text-2xl'>
          {item.title}
        </h3>

        <p className='flex items-center text-base font-bold text-white md:text-xl'>
          ₩ {item.price.toLocaleString()}
          <span className='text-md ml-1 font-normal text-gray-600'>/ 인</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularItem;
