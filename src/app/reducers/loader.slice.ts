import { createSlice } from '@reduxjs/toolkit'

interface LoaderState {
    isAppLoading: boolean
    isPostLoading: boolean
    isNewPostLoading: boolean
}

export const initialState: LoaderState = {
    isAppLoading: false,
    isPostLoading: false,
    isNewPostLoading: false
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        toggleAppLoader: (state) => {
            state.isAppLoading = !state.isAppLoading
        },
        togglePostLoader: (state) => {
            state.isPostLoading = !state.isPostLoading
        },
        toggleNewPostLoader: (state) => {
            state.isNewPostLoading = !state.isNewPostLoading
        }
    }
})

export const loaderReducers = loaderSlice.actions
export default loaderSlice.reducer
