import {CharacterType} from "@/app/types/characters.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCharacters, fetchCharactersById} from "@/entities/reducers/ActionCreators";
import {EpisodeType} from "@/app/types/episode.type";


interface CharacterState{
    characters:CharacterType[],
    episodes: EpisodeType[],
    isLoading:boolean,
    error:string | null
}

const initialState:CharacterState = {
    characters:[],
    episodes: [],
    isLoading:false,
    error:''
}

export const characterSlice=createSlice({
    name:'character',
    initialState,
    extraReducers:(builder) => {
        builder
            .addCase(fetchCharacters.fulfilled, (state, action:PayloadAction<CharacterType[]>)=>{
                state.isLoading=false
                state.error=''
                state.characters=[...state.characters, ...action.payload]
            })
            .addCase(fetchCharacters.pending, (state)=>{
                state.isLoading=true
            })
            .addCase(fetchCharacters.rejected, (state, action:PayloadAction<string>)=>{
                state.isLoading=false
                state.error=action.payload
            })
            .addCase(fetchCharactersById.fulfilled, (state, action: PayloadAction<EpisodeType[]>) => {
                state.isLoading = false;
                state.error = null;
                state.episodes = action.payload;
            })
            .addCase(fetchCharactersById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCharactersById.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})
