import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../assets/logo.svg'
import backBtn from '../../assets/back-btn.svg'
import Image from 'next/image'

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
        <Image
          src={logo.src}
          alt='zoftify logo'
          className='ml-6 bg-white cursor-pointer'
          width={78}
          height={17.65}
          onClick={() => nav('/')}
        />
      </div>
      <div className='pl-5 font-normal text-[18px] leading-6 not-italic flex items-center gap-5'>
        {pathname === '/create-post' ? (
          <>
            <div className='rounded-[4px] border-[1px] border-[#DBDBE2] w-[28px] h-[28px] flex items-center justify-center'>
              <Image
                src={backBtn.src}
                alt='back-btn'
                width={14}
                height={14}
                onClick={() => nav('/')}
                className='cursor-pointer'
              />
            </div>
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
