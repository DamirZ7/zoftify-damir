import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import SearchInput from '../components/Search/Search'
import CustomButton from '../components/customButton'
import FilterButtons from '../components/filterButtons'
import Table from '../components/Table'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
// import { changePostStatus, getMainData, setPostStatus } from '../redux/slice/postSlice/postsSlice'
import { getAllData, getMainData, changePostStatus } from '../redux/store'
import Pagination from '../components/pagination'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Home: NextPage = () => {
  dayjs.extend(relativeTime)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [id, setId] = useState(-1)
  const [page, setPage] = useState(1)
  const [pagNum, setPagNum] = useState<number>(1)
  const [totalCount, setTotalCount] = useState(5)

  const dispatch = useDispatch()

  // let totalCount = 10

  const allData = useSelector(getMainData)?.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()),
  )

  const filterData = filter !== '' ? allData.filter((it) => it.status === filter) : allData

  const tableHead = ['ID', 'Title', 'Time', 'Status']

  const nav = (href: string) => {
    router.push(href)
  }

  const tab = (status: string) => {
    setFilter(status)
    setPage(1)
  }

  const handleChange = (filterData: any) => {
    dispatch(changePostStatus(filterData))
    setId(filterData?.id)
  }

  useEffect(() => {
    if (filter === '') {
      if (filterData) {
        if (filterData.length % totalCount === 0) {
          setPagNum(Math.floor(filterData.length / totalCount))
        } else {
          setPagNum(Math.floor(filterData.length / totalCount) + 1)
        }
      }
    } else {
      const tempData = filterData.filter((it) => it.status === filter)
      if (!!tempData) {
        if (tempData.length % totalCount === 0) {
          setPagNum(Math.floor(tempData.length / totalCount))
        } else {
          setPagNum(Math.floor(tempData.length / totalCount) + 1)
        }
      }
    }
  }, [filterData, totalCount, filter])

  useEffect(() => {
    if (!allData?.length) dispatch(getAllData())
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Zoftify app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex justify-between flex-col'>
        <div className='w-full'>
          <div className='flex justify-between items-center py-0 px-6'>
            <SearchInput setSearch={setSearch} />
            <CustomButton width={163} title='Create Post' onClick={() => nav('/create-post')} />
          </div>
          <div className='flex gap-2 mt-[12px] py-0 px-[24px]'>
            <FilterButtons
              title='All statuses'
              active={filter === ''}
              isNum
              count={allData?.length}
              onClick={() => tab('')}
            />
            <FilterButtons
              title='Draft'
              active={filter === 'draft'}
              isNum
              count={allData?.filter((it) => it.status === 'draft')?.length}
              onClick={() => tab('draft')}
            />
            <FilterButtons
              title='Published'
              active={filter === 'published'}
              isNum
              count={allData?.filter((it) => it.status === 'published')?.length}
              onClick={() => tab('published')}
            />
          </div>
          <Table>
            <table>
              <thead>
                <tr>
                  {tableHead.map((it, i) => (
                    <th key={i}>{it}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filterData
                  ?.slice(totalCount * (page - 1), totalCount * page)
                  .map((it: any, i: number) => (
                    <tr key={i}>
                      <td>{it.id}</td>
                      <td>{it.title}</td>
                      <td>{dayjs(it.date).fromNow()}</td>
                      <td>
                        <select
                          value={it.status}
                          onChange={(e) => {
                            handleChange({ id: it?.id, status: e.target.value })
                          }}
                          id='status'
                          className='font-gilroy'>
                          <option value='draft'>Draft</option>
                          <option value='published'>Published</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Table>
        </div>

        <Pagination
          filterData={filterData}
          setPage={setPage}
          pagNum={pagNum}
          page={page}
          totalCount={totalCount}
          setTotalCount={setTotalCount}
        />
      </div>
    </>
  )
}

export default Home
