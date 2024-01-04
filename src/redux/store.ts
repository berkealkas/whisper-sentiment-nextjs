'use client'

import { configureStore } from "@reduxjs/toolkit"
import transcriptReducer from './features/transcriptSlice'

export const store = configureStore({
    reducer: {
        transcript: transcriptReducer
    }
})