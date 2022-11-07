import { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './customDatePicker.module.scss'
import DatePicker from 'react-datepicker'
import Image from 'next/image'
import dateIcon from '../../assets/date-icon.svg'

export interface IInputProps {
  placeholder?: string
  name: string
  error?: string
  control: any
  required?: boolean
  label?: string
  disabled?: boolean
}

const customDatePicker: FC<IInputProps> = ({
  placeholder = '',
  name,
  error = '',
  control,
  required = false,
  label = '',
  disabled,
  ...args
}) => {
  return (
    <div className={styles.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <div className='flex items-center justify-between bg-[#f5f6fa] rounded-[8px] overflow-hidden pr-[14.5px]'>
              <DatePicker
                id={name}
                disabled={disabled}
                onChange={onChange}
                selected={value}
                showTimeSelect
                isClearable
                placeholderText={placeholder}
                dateFormat='MMMM d, yyyy h:mm aa'
                className={`${styles.dateInput} ${!!error ? styles.required : ''}`}
                {...args}
              />
              <Image src={dateIcon.src} alt='date' width={15} height={15} />
            </div>
          )
        }}
      />
    </div>
  )
}

export default customDatePicker
