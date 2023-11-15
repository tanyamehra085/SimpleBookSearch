import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getallBooks } from "../baseUrl";


export const getAllBooks = createAsyncThunk(
    "get/AllBooks",
    async(query:string,{rejectWithValue})=>{
        try {
            let res = await axios.get(`${getallBooks}?${query}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

type addbooktype={
author:string,
country:string,
language:string,
link:string,
pages:number | string,
title:string,
year:number | string,

  }

export const AddBookcall = createAsyncThunk(
    "post/AddBook",
    async(data:addbooktype,{rejectWithValue})=>{
        try {
            let res = await axios.post(`${getallBooks}`,data)
            return res?.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

type undatebooktype={
author:string | undefined,
country:string | undefined,
language:string | undefined,
link:string | undefined,
pages:number | string | undefined,
title:string | undefined,
year:number | string | undefined,
id:number | undefined
}

export const updateBook = createAsyncThunk(
    "put/updatebook",
    async(data:undatebooktype,{rejectWithValue})=>{
        try {
            let res = await axios.put(`${getallBooks}/${data.id}`,{
                author:data.title,
                country:data.country,
                language:data.language,
                link:data.link,
                pages:data.pages,
                title:data.title,
                year:data.year,
                
            })
            return res?.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


// interface Begin

interface paginationtype{
    sortDirection: string;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalElements: number
}

interface finaldatatype{
    author: string;
    country: string;
    language: string;
    link: string;
    pages: string;
    title: string;
    year: string;
    id: number;
}

interface datatype{
    pagination: paginationtype;
    data: Array<finaldatatype>

}

interface bookstate{
    loading: boolean;
    error: string | null;
    data:datatype | null;
    edit: finaldatatype | null;
}
// interface Ends



const initialState ={
    loading: false,
    error: null,
    data:null,
    edit:null,
} as bookstate

const BooksSlice = createSlice({
    name:"books",
    initialState,
    reducers:{
            editdata:(state, action)=>{
                state.edit = action.payload
            }
    },
    extraReducers:(builder)=> {
            builder.addCase(getAllBooks.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getAllBooks.fulfilled,(state,action:PayloadAction<any>)=>{
                state.loading = false;
                state.data =action.payload
            })
            .addCase(getAllBooks.rejected,(state,action:PayloadAction<any>)=>{
                state.loading = false;
                state.error =action.payload.message
            })
    },
})

export const {editdata} = BooksSlice.actions
export default BooksSlice.reducer