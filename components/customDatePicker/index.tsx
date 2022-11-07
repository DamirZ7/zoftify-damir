import { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './customDatePicker.module.scss'
import DatePicker from 'react-datepicker'

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
            <div className=''>
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
            </div>
          )
        }}
      />
    </div>
  )
}

export default customDatePicker
