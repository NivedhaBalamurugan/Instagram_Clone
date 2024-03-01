
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        resetCredentials: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token