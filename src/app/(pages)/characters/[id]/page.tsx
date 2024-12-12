'use client'

import React, { useEffect } from 'react';
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { fetchCharactersById } from "@/entities/reducers/ActionCreators";
import EpisodesList from "@/shared/ui/episodesList";
import Loader from "@/shared/ui/Loader";
import {RootState} from "@/app/(store)/store";

const CharacterId = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { episodes, isLoading, error } = useAppSelector((state:RootState) => state.character);

    useEffect(() => {
        if (id) {
            dispatch(fetchCharactersById(Number(id)));
        }
    }, [id, dispatch]);

    return (
        <div>
            <EpisodesList episodes={episodes} />
            {isLoading && <Loader />}
            {error && <h1 className='text-3xl text-center font-semibold mt-48'>{error}</h1>}
        </div>
    );
};

export default CharacterId;
