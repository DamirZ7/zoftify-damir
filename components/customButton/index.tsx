import React, { FC } from 'react'
import styles from './customButton.module.scss'

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  width: number
  onClick?: () => void
}

const CustomButton: FC<ICustomButton> = ({ type, title, width, onClick }) => {
  return (
    <button
      type={type}
      className={styles.customButton}
      style={{ width: `${width}px` }}
      onClick={onClick}>
      {title}
    </button>
  )
}

export default CustomButton
