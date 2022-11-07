import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import styles from 'styles/create-post.module.scss'
import Head from 'next/head'
import { createPost, getCallStatus } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/customButton'
import TextInput from '../components/textInput'
import CustomSelect from '../components/customSelect'
import { useRouter } from 'next/router'
import CustomDatePicker from '../components/customDatePicker'
import 'react-datepicker/dist/react-datepicker.css'

interface ICreatePostInterface {
  title: string
  date: string
  status: 'published' | 'draft'
  id: any
}

const CreatePost: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ICreatePostInterface>()

  const onSubmit = (data: ICreatePostInterface) => {
    dispatch(
      createPost({
        //@ts-ignore
        status: data?.status?.value,
        title: data?.title,
        date: data?.date,
      }),
    )

    if (isSubmitSuccessful === true) router.push('/')
  }

  const loading = useSelector(getCallStatus('new'))

  return (
    <>
      <Head>
        <title>Zoftify app</title>
        <link rel='icon' href='/logo.svg' />
      </Head>
      <div className={styles.container}>
        <div className={styles.text}>Post information</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapper}>
            <TextInput
              required
              control={control}
              name='title'
              placeholder='Title'
              error={errors?.title?.message}
            />
            <CustomSelect
              required
              control={control}
              name='status'
              placeholder='Status'
              error={errors?.status?.message}
              options={[
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
              ]}
            />
            <CustomDatePicker
              required
              name='date'
              control={control}
              placeholder='Time'
              error={errors?.date?.message}
            />

            <div className='mt-[42px]'>
              <CustomButton
                width={163}
                title='Submit'
                type='submit'
                // loading={loading?.isLoading}
                disabled={loading?.isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default CreatePost
