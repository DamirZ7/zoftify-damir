import Link from 'next/link'
import React from 'react'
import posts from '../../assets/posts.svg'
import styles from './Sidebar.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {}

const Sidebar = (props: Props) => {
  const router = useRouter()
  const nav = (href: string) => {
    router.push(href)
  }

  return (
    <div className={styles.sidebar}>
      <div className=''>
        <div className='w-[184px] h-[40px] flex items-center rounded-lg m-auto cursor-pointer bg-[#F5F6FA]'>
          <Image
            src={posts.src}
            alt='title'
            className='ml-[18px] cursor-pointer'
            width={24}
            height={24}
            onClick={() => nav('/')}
          />
          <p className='ml-[8px] font-normal font-sans text-sm'>Posts</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
