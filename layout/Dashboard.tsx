import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import styles from './Dashboard.module.scss'

type Props = {}

const Dashboard = ({ children }: any) => {
  return (
    <div className='w-full h-full flex overflow-hidden bg-[#EBEEF6]'>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.secondLayout}>
        <div className={styles.side}>
          <Sidebar />
        </div>
        <div className={styles.mainLayout}>{children}</div>
      </div>
    </div>
  )
}

export default Dashboard
