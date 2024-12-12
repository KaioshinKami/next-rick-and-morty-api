import {string} from "postcss-selector-parser";
import {CharacterType} from "@/app/types/characters.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CharacterState{
    characters:CharacterType[],
    isLoading:boolean,
    error:string | null
}

const initialState:CharacterState = {
    characters:[],
    isLoading:false,
    error:''
}

export const characterSlice=createSlice({
    name:'character',
    initialState,
    reducers:{
        charactersFetching(state){
            state.isLoading=true
        },
        charactersFetchingSuccess(state, action:PayloadAction<CharacterType[]>){
            state.isLoading=false
            state.error=''
            state.characters=[...state.characters, ...action.payload]
        },
        charactersFetchingError(state, action:PayloadAction<string>){
            state.isLoading=false
            state.error=action.payload
        }

    }
})
