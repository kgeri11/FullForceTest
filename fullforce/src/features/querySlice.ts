import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState: any = {
  queries: []
}

let counter = 0

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    addQuery: (state, action) => {
      const query = {
        id: counter++,
        text: action.payload
      }
      state.queries.push(query)
    }
  }
})

export const { addQuery } = querySlice.actions

export default querySlice.reducer
