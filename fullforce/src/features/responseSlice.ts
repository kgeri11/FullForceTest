import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState: any = {
  responses: []
}

let counter = 0

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    addResponse: (state, action) => {
      const response = {
        id: counter++,
        text: action.payload
      }
      state.responses.push(response)
    }
  }
})

export const { addResponse } = responseSlice.actions

export default responseSlice.reducer
