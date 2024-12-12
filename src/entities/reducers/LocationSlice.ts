import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocationTypes} from "@/app/types/location.types";
import {CharacterType} from "@/app/types/characters.types";
import {fetchLocationsById, fetchLocations} from "@/entities/reducers/ActionCreators";

interface LocationState{
    locations:LocationTypes[],
    characters:CharacterType[],
    isLoading:boolean,
    error:string,
    totalCount:number
}

const initialState:LocationState={
    locations:[],
    characters:[],
    isLoading:false,
    error:'',
    totalCount:0
}

export const locationSlice=createSlice({
    name: 'location',
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLocations.fulfilled, (state, action:PayloadAction<{results: LocationTypes[], info: {count:number}}>)=>{
                state.isLoading=false;
                state.error='';
                state.locations=action.payload.results
                state.totalCount=action.payload.info.count
            })
            .addCase(fetchLocations.pending, (state)=>{
                state.isLoading=true
            })
            .addCase(fetchLocations.rejected, (state, action:PayloadAction<string>)=>{
                state.isLoading=false;
                state.error=action.payload;
            })
            .addCase(fetchLocationsById.fulfilled, (state, action:PayloadAction<LocationTypes[]>)=>{
                state.isLoading=false;
                state.error='';
                state.characters=action.payload;
            })
            .addCase(fetchLocationsById.rejected, (state)=>{
                state.error=action.payload
            })
            .addCase(fetchLocationsById.pending, (state, action:PayloadAction<string>)=>{
                state.isLoading=true;
                state.error=null
            })
    }
})