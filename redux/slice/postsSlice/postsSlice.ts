import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStore } from '../../store'
import * as asyncFunctions from '../../../utils/calc'

interface IPostsSliceStore {
  data: {
    isLoading: boolean
    isError: boolean
    data: IData[]
  }
  pagination: number
  new: {
    isLoading: boolean
    isError: boolean
  }
  status: {
    isLoading: boolean
    isError: boolean
  }
}

type IData = {
  id?: number
  title: string
  status: 'draft' | 'published'
  date: string
}
type IStatus = {
  status: 'draft' | 'published'
  id: number
}

export const getAllData: any = createAsyncThunk(
  'data/get',
  async (data, { dispatch, getState }) => {
    try {
      dispatch(setLoading({ key: 'data', data: true }))
      const res = await asyncFunctions.getData((getState() as IStore).postsSlice.data.data)
      return res?.data
    } catch (err) {
      dispatch(setError({ key: 'data', data: true }))
      throw err
    }
  },
)

export const createPost: any = createAsyncThunk(
  'data/create',
  async (data: IData, { dispatch, getState }) => {
    try {
      dispatch(setLoading({ key: 'new', data: true }))
      console.log(data)
      const res = await asyncFunctions.addPost((getState() as IStore).postsSlice.data.data, data)
      // @ts-ignore
      return res?.data
    } catch (err) {
      dispatch(setError({ key: 'new', data: true }))
      throw err
    }
  },
)

export const changePostStatus: any = createAsyncThunk(
  'data/changeStatus',
  async (data: IStatus, { dispatch, getState }) => {
    try {
      dispatch(setLoading({ key: 'status', data: true }))
      const res = await asyncFunctions.changeStatus(
        data.id,
        data.status,
        (getState() as IStore).postsSlice.data.data,
      )
      // @ts-ignore
      return res?.data
    } catch (err: any) {
      dispatch(setError({ key: 'status', data: true }))
      throw err
    }
  },
)

const initialState: IPostsSliceStore = {
  data: {
    data: [],
    isLoading: false,
    isError: false,
  },
  new: {
    isLoading: false,
    isError: false,
  },
  status: {
    isLoading: false,
    isError: false,
  },
  pagination: 5,
}

const slice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setLoading: (store, { payload }) => {
      const { key, data }: { key: 'data'; data: boolean } = payload
      store[key].isLoading = data
    },
    setError: (store, { payload }) => {
      const { key, data }: { key: 'data'; data: boolean } = payload
      store[key].isError = data
    },
    togglePagination: (
      store: IPostsSliceStore,
      { payload }: PayloadAction<IPostsSliceStore['pagination']>,
    ) => {
      store.pagination = payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllData.fulfilled, (store, { payload }) => {
        store.data.data = payload
        store.data.isLoading = false
        store.data.isError = false
      })
      .addCase(createPost.fulfilled, (store, { payload }) => {
        store.data.data = payload
        store.new.isLoading = false
        store.new.isError = false
      })
      .addCase(changePostStatus.fulfilled, (store, { payload }) => {
        store.data.data = payload
        store.status.isLoading = false
        store.status.isError = false
      })
      .addCase(getAllData.rejected, (store) => {
        store.data.isLoading = false
        store.data.isError = true
      })
      .addCase(createPost.rejected, (store) => {
        store.new.isLoading = false
        store.new.isError = true
      })
      .addCase(changePostStatus.rejected, (store) => {
        store.status.isLoading = false
        store.status.isError = true
      }),
})

export const { togglePagination, setLoading, setError } = slice.actions

export default slice.reducer

export const getMainData = createSelector(
  (store: IStore) => store.postsSlice,
  (postsSliceStore) => postsSliceStore.data.data,
)

export const getPagination = createSelector(
  (store: IStore) => store.postsSlice,
  (postsSliceStore) => postsSliceStore.pagination,
)

export const getCallStatus = (key: 'data' | 'new' | 'status') =>
  createSelector(
    (store: IStore) => store.postsSlice,
    (reducer) => ({
      isLoading: reducer[key].isLoading,
      isError: reducer[key].isError,
    }),
  )
