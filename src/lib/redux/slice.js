import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
}

export const dashboardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) =>{
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) =>{
      state.isAuthenticated = false
      state.user = null
    }
  },
})

export const {login,logout} = dashboardSlice.actions;

export default dashboardSlice.reducer;