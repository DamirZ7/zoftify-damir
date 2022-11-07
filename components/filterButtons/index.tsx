import { FC } from 'react'
import styles from './filterButtons.module.scss'

interface IFilterButtons {
  title: string
  active: boolean
  isNum?: boolean
  count?: number
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  loading?: boolean
  // disabled: boolean
}

const FilterButtons: FC<IFilterButtons> = ({
  title,
  active,
  isNum = false,
  count,
  onClick,
  type = 'button',
  // disabled,
}) => {
  return (
    <button
      className={`${styles.filterButtons}
            ${active ? styles.filterButtons__active : styles.filterButtons__inactive}
            `}
      onClick={() => onClick?.()}
      type={type}
      // disabled={disabled}
    >
      {title}
      {isNum && (
        <div
          className={`${styles.filterButtons__count}
                     ${active ? styles.active : styles.inactive}`}>
          {count}
        </div>
      )}
    </button>

    // <div
    //   className={`${styles.customSwitcher} ${active && styles.customSwitcher__active}`}
    //   onClick={() => onClick?.()}
    //   type={}>
    //   <span className={styles.customSwitcher__title}>{title}</span>
    //   <span className={styles.customSwitcher__count}>{count}</span>
    // </div>
  )
}

export default FilterButtons
