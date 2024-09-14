import { createSlice } from '@reduxjs/toolkit'

// THEME STATE
const initialState = {
  mode: 'dark',
  userId: '63701cc1f032398675000125'
}
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? "dark" : "light"
    }
  }
})
export const { setMode } = globalSlice.actions
export default globalSlice.reducer

