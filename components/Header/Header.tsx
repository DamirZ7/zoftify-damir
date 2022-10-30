import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../assets/logo.svg'
import backBtn from '../../assets/back-btn.svg'

type Props = {}

const Header = (props: Props) => {
  const { pathname } = useRouter()
  const router = useRouter()
  const nav = (href: string) => {
    router.push(href)
    // [...router, href]
  }

  return (
    <div className='flex items-center w-full h-[48px] bg-white relative'>
      <div className='w-[208px]'>
        <Link href={'/'} className='bg-white'>
          <img src={logo.src} alt='zoftify logo' className='ml-6 bg-white' />
        </Link>
      </div>
      <div className='pl-5 font-normal text-[18px] leading-6 not-italic flex items-center gap-5'>
        {pathname === '/create-post' ? (
          <>
            <Link href={'/'} className='bg-white' onClick={() => nav('/')}>
              <img src={backBtn.src} alt='back-btn' />
            </Link>
            <div>New Post</div>
          </>
        ) : (
          <div>Posts</div>
        )}
      </div>
    </div>
  )
}

export default Header
