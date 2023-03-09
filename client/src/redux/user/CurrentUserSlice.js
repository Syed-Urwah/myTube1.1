import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  loading: false,
  error: "",
  query:""
}

export const CurrentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    loginStart: (state)=>{
        state.loading = true;
    },
    loginSuccess: (state, action)=>{
        state.loading = false;
        state.currentUser = action.payload
    },
    loginFailed: (state, action)=>{
        state.loading = false;
        state.error = action.payload
    },
    videoQuery:(state,action)=>{
      state.query = action.payload
    }
  }
    
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailed, videoQuery } = CurrentUserSlice.actions
export default CurrentUserSlice.reducer