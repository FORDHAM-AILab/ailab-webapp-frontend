// import {
//     LOGINSAVEUSER,
//     LOGOUTCLEARUSER
//   } from '../actions/action_types'
  
//   // const initialState = {
//   // }
  
//   const cache_user = (state = {}, action) => {
//     switch (action.type) {
//       case LOGINSAVEUSER:
//         return state
//       case LOGOUTCLEARUSER:
//         return {}
//       default:
//         return state
//     }
//   }
  
//   export default cache_user
  
import { createSlice } from '@reduxjs/toolkit'
export const users = createSlice({
  name: 'user',
  initialState: {
    user: null,
    access_token: null
  },
  reducers: {
    saveUser: (state, action)=> {
      state.user = action.payload
    },
    updateUser: (state, action)=>{
      state.user = action.payload
    },
    clearUser: state => {
      state.user = null
    },
    setToken: (state,action) => {
      state.access_token = action.payload
    },
    clearToken: state => {
      state.access_token = null
    }
  }
})

export const {saveUser, updateUser, clearUser, setToken, clearToken} = users.actions

export default users.reducer