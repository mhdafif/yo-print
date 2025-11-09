import { configureStore } from '@reduxjs/toolkit'
import { animeSearchSlice } from '../features/anime/animeSearchSlice'

export const store = configureStore({
  reducer: {
    animeSearch: animeSearchSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch