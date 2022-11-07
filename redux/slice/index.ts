import { combineReducers } from '@reduxjs/toolkit'
import postsSlice from './postsSlice/postsSlice'
export default combineReducers({ postsSlice })
export * from './postsSlice/postsSlice'
