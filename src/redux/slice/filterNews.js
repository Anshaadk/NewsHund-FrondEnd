import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    filterNewsData:null
}

export const filterNews = createSlice({
    name:'filterNewsData',
    initialState,
    reducers:{
        addFilternews:(state,action)=>{
            console.log(action.payload,'sssss')
            state.filterNewsData = action.payload
        },
        removeFilterNews:(state,action)=>{
            state.filterNewsData = action.payload
        }
    }
})

export const { addFilternews,removeFilterNews } = filterNews.actions;
export default filterNews.reducer;