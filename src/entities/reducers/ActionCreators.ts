import { AppDispatch } from "@/app/(store)/store";
import { characterSlice } from "./CharacterSlice";
import axiosInstance from "@/shared/libs/axios";
import { CharacterType } from "@/app/types/characters.types";

export const fetchCharacters = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(characterSlice.actions.charactersFetching());
        const response = await axiosInstance.get<{ results: CharacterType[]; info: { pages: number } }>('/character', {
            params: { page },
        });
        dispatch(characterSlice.actions.charactersFetchingSuccess(response.data.results));
    } catch (e: any) {
        dispatch(characterSlice.actions.charactersFetchingError(e.message));
    }
};
