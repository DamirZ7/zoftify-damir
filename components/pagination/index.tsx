import { Dispatch, FC, SetStateAction } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import CustomSelect from '../customSelect'

interface IPagination {
  setPage: Dispatch<SetStateAction<number>>
  pagNum: number
  page: number
  filterData: any
  totalCount: string | number
  setTotalCount: any
}

const Pagination: FC<IPagination> = ({
  setPage,
  pagNum,
  page,
  filterData,
  totalCount,
  setTotalCount,
}) => {
  console.log(page)
  console.log(pagNum)
  const arr = new Array(pagNum).fill('').map((_, i) => i + 1)

  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }
  const handleNext = () => {
    if (page !== pagNum) {
      setPage(page + 1)
    }
  }

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 h-full'>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div className='flex justify-between items-center'>
          <select
            name='pagination'
            id='page'
            className='inline-block border-none outline-none cursor-pointer bg-[#F5F6FA] h-[32px] w-[64px] mr-2 rounded-md p-2'
            value={totalCount}
            onChange={(e) => {
              setTotalCount(e.target.value)
            }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>1</span> -{' '}
            <span className='font-medium'>{totalCount}</span> of{' '}
            <span className='font-medium'>{filterData?.length}</span>
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex justify-center content-center space-x-1 rounded-md h-[32px]'
            aria-label='Pagination'>
            <div
              className='relative cursor-pointer inline-flex items-center rounded bg-[#F5F6FA] px-2 py-2 w-[32px] text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => handlePrev()}>
              <div className='sr-only'>Previous</div>
              <ChevronLeftIcon className='h-5 w-5 text-[#667281]' aria-hidden='true' />
            </div>
            {arr?.map((it, i) => {
              return (
                <div
                  key={i}
                  aria-current='page'
                  className={`relative z-10 inline-flex justify-center rounded cursor-pointer items-center ${
                    page === it ? 'bg-[#177EFF]' : '!text-[#667281]'
                  } px-3.5 py-2 text-sm font-medium text-white w-[32px]`}
                  onClick={() => setPage(it)}>
                  {it}
                </div>
              )
            })}
            <div
              className='relative inline-flex cursor-pointer items-center rounded bg-[#F5F6FA] px-2 py-2 w-[32px] text-sm font-medium text-[#667281] hover:bg-gray-50'
              onClick={() => handleNext()}>
              <div className='sr-only'>Next</div>
              <ChevronRightIcon className='h-5 w-5 text-[#667281]' aria-hidden='true' />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Pagination
