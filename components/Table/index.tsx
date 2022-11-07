import { FC } from 'react'
import styles from './table.module.scss'

interface ITable {
  children: JSX.Element
}

const Table: FC<ITable> = ({ children }) => {
  return <div className={styles.customTable}>{children}</div>
}

export default Table
