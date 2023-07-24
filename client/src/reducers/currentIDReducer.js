import { createSlice } from '@reduxjs/toolkit'

const initialState = { id: null, title: '' }

const currentIdSlice = createSlice({
  name: 'currentId',
  initialState,
  reducers: {
    setCurrentId: (state, action) => {
      state.id = action.payload.id
      state.title = action.payload.title
    }
  }
})

export const { setCurrentId } = currentIdSlice.actions
export default currentIdSlice.reducer
