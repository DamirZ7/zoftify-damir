import Link from 'next/link'
import React from 'react'
import posts from '../../assets/posts.svg'
import styles from './Sidebar.module.scss'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className={styles.sidebar}>
      <Link href={'/'}>
        <div className=''>
          <div className='w-[184px] h-[40px] flex items-center rounded-lg m-auto cursor-pointer bg-[#F5F6FA]'>
            <img src={posts.src} alt='title' className='ml-[18px]' />
            <p className='ml-[8px] font-normal font-sans text-sm'>Posts</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
