import axiosInstance from "@/shared/libs/axios";
import { CharacterType } from "@/app/types/characters.types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EpisodeType} from "@/app/types/episode.type";

export const fetchCharacters=createAsyncThunk(
    'character/fetchAll',
    async (page:number, thunkAPI)=>{
        try{
            const response = await axiosInstance.get<{ results: CharacterType[]; info: { pages: number } }>('/character', {
                params: { page },
            });
            return response.data.results
        }
        catch (e){
            return thunkAPI.rejectWithValue('Не удалось загрузить характеров')
        }
    }
)

export const fetchCharactersById = createAsyncThunk(
    'characterId/fetchEpisodes',
    async (id: number, thunkAPI) => {
        try {
            const response = await axiosInstance(`/character/${id}`)
            const episodeUrl = response.data.episode;
            const episodeFetch= episodeUrl.map((episode)=>axiosInstance(episode))
            const episodeResponse=await Promise.all(episodeFetch)
            const episodeMap=episodeResponse.map((episode)=>episode.data)

            return episodeMap
        } catch (error) {
            return thunkAPI.rejectWithValue('Не удалось загрузить эпизоды');
        }
    }
);

export const fetchEpisodes = createAsyncThunk(
    'episode/fetchAll',
    async (page: number, thunkAPI) => {
        try {
            const response = await axiosInstance.get<{ results: EpisodeType[], info: { count: number } }>('/episode', {
                params: { page }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить эпизоды');
        }
    }
);

export const fetchEpisodesById=createAsyncThunk(
    'episodes/fetchCharacters',
    async (id: number, thunkAPI)=>{
        try {
            const response = await axiosInstance(`/episode/${id}`);
            const data=response.data.characters
            const dataMap=data.map(url=>axiosInstance.get(url))
            const dataPromise=await Promise.all(dataMap)
            const residents=dataPromise.map(resident=>resident.data)

            return residents
        }
        catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить характеров')
        }
    }
)

export const fetchLocations=createAsyncThunk(
    'location/fetchAll',
    async (page:number, thunkAPI)=>{
        try {
            const response=await axiosInstance.get('/location', {
                params: {page}
            })

            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить эпизоды')
        }
    }
)

export const fetchLocationsById=createAsyncThunk(
    'location/fetchCharacters',
    async (id:number, thunkAPI)=>{
        try {
            const response = await axiosInstance.get(`/location/${id}`)
            const residents = response.data.residents
            const fetchResidents = residents.map((resident) => axiosInstance(resident))
            const residentResponse= await Promise.all(fetchResidents)
            const dataMap=residentResponse.map((data)=>data.data)

            return dataMap;
        }
        catch (e){
            return thunkAPI.rejectWithValue('Не удалось загрузить характеров')
        }
    }
)