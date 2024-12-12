import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EpisodeType } from "@/app/types/episode.type";
import { CharacterType } from "@/app/types/characters.types";
import { fetchEpisodes, fetchEpisodesById } from "@/entities/reducers/ActionCreators";

interface EpisodeState {
    episodes: EpisodeType[];
    characters: CharacterType[];
    isLoading: boolean;
    error: string;
    totalCount: number;
}

const initialState: EpisodeState = {
    episodes: [],
    characters: [],
    isLoading: false,
    error: '',
    totalCount: 0,
};

export const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.fulfilled, (state, action: PayloadAction<{ results: EpisodeType[], info: { count: number } }>) => {
                state.isLoading = false;
                state.error = '';
                state.episodes = action.payload.results;
                state.totalCount = action.payload.info.count;
            })
            .addCase(fetchEpisodes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEpisodes.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchEpisodesById.fulfilled, (state, action: PayloadAction<CharacterType[]>) => {
                state.isLoading = false;
                state.error = '';
                state.characters = action.payload;
            })
            .addCase(fetchEpisodesById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEpisodesById.rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});
