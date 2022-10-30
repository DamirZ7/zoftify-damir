import { FC } from 'react'
import styles from './filterButtons.module.scss'

interface IFilterButtons {
  title: string
  count: number
  isActive?: boolean
  handleChange: () => void
}

const FilterButtons: FC<IFilterButtons> = ({ title, count, isActive, handleChange }) => {
  return (
    <div
      className={`${styles.filterButtons} ${isActive && styles.filterButtons__active}`}
      onClick={handleChange}>
      <span className={styles.filterButtons__title}>{title}</span>
      <span className={styles.filterButtons__count}>{count}</span>
    </div>
  )
}

export default FilterButtons
