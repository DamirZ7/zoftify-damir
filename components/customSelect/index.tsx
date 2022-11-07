import { FC } from 'react'
import { Controller } from 'react-hook-form'
// import ErrorLabel from '../text-input/ErrorLabel/ErrorLabel'
import styles from './select.module.scss'
import Select from 'react-select'

export interface IInputProps {
  placeholder?: string
  name: string
  htmlType?: string
  error?: string
  control: any
  required?: boolean
  label?: string
  disabled?: boolean
  defaultValue?: IOption[] | IOption
  options: IOption[] | IOption
}

export interface IOption {
  label: string
  value: 'draft' | 'published' | string
}

const CustomSelect: FC<IInputProps> = ({
  placeholder = '',
  name,
  htmlType = 'text',
  error = '',
  control,
  required = false,
  label = '',
  disabled,
  defaultValue,
  options,
  ...args
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      outline: 'none',
      background: '#F5F6FA',
      borderRadius: '8px',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      color: '#667281',
      borderColor: '#f5f6fa',
      width: '365px',

      '&:hover': {
        borderWidth: '1.2px',
        borderColor: state.isFocused ? '#177EFF' : null,
        boxShadow: '0 0 0 1px #177eff',
      },

      // Overwrittes the different states of border
      // borderColor: state.isFocused ? 'yellow' : 'green',
      // Removes weird border around container
      // ,
    }),
  }

  return (
    <div className={styles.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              placeholder={placeholder}
              isDisabled={disabled}
              id={name}
              defaultValue={defaultValue}
              onChange={onChange}
              value={value}
              // @ts-ignore
              options={options}
              styles={customStyles}
              {...args}
            />
          )
        }}
      />
      {/* <ErrorLabel error={error} /> */}
    </div>
  )
}

export default CustomSelect
