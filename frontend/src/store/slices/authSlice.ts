import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
  id: string
  name: string
  email: string
  token: string
}

interface AuthState {
  user: UserInfo | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error?: string
}

const initialState: AuthState = {
  user: null,
  status: 'idle'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  loginStart(state: AuthState) { state.status = 'loading'; state.error = undefined },
  loginSuccess(state: AuthState, action: PayloadAction<UserInfo>) { state.status = 'authenticated'; state.user = action.payload },
  loginFailure(state: AuthState, action: PayloadAction<string>) { state.status = 'error'; state.error = action.payload },
  logout(state: AuthState) { state.user = null; state.status = 'idle' }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
