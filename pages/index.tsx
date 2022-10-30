import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import SearchInput from '../components/Search/Search'
import CustomButton from '../components/customButton'
import FilterButtons from '../components/filterButtons'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const filterData = [
    { id: '', title: 'All Statuses', count: 10 },
    { id: 'draft', title: 'Draft', count: 5 },
    { id: 'published', title: 'Published', count: 5 },
  ]

  const router = useRouter()
  const nav = (href: string) => {
    router.push(href)
  }
  const tab = (status: string) => {
    setFilter(status)
  }

  return (
    <>
      <Head>
        <title>Zoftify app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <div className='flex justify-between items-center py-0 px-6'>
          <SearchInput setSearch={setSearch} />
          <CustomButton width={163} title='Create Post' onClick={() => nav('/create-post')} />
        </div>
        <div className='flex gap-2 mt-[12px] py-0 px-[24px]'>
          {filterData.map((it, i) => (
            <FilterButtons
              key={i}
              title={it.title}
              count={it.count}
              isActive={filter === it.id}
              handleChange={() => tab(it.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
