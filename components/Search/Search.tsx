import React, { Dispatch, FC, SetStateAction } from 'react'
import searchSvg from '../../assets/search.svg'
import styles from './Search.module.scss'
import Image from 'next/image'

interface ISearchInputProps {
  setSearch: Dispatch<SetStateAction<string>>
}

const SearchInput: FC<ISearchInputProps> = ({ setSearch }) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <input
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={(event) => setSearch(event.target.value)}
        />
        <Image src={searchSvg.src} alt='Search' width={20} height={20} />
      </div>
    </div>
  )
}

export default SearchInput
