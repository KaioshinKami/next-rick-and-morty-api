'use client'

import React, { useEffect } from 'react';
import { useParams } from "next/navigation";
import CharactersList from "@/shared/ui/charactersList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { fetchEpisodesById } from "@/entities/reducers/ActionCreators";
import { RootState } from "@/app/(store)/store";
import Loader from "@/shared/ui/Loader";

const EpisodeId = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { characters, error, isLoading } = useAppSelector((state: RootState) => state.episode);

    useEffect(() => {
        if (id) {
            dispatch(fetchEpisodesById(Number(id)));
        }
    }, [id, dispatch]);

    return (
        <div>
            <CharactersList characters={characters} />

            {isLoading && <Loader />}
            {error && <h1 className='text-3xl text-center font-semibold mt-48'>{error}</h1>}
        </div>
    );
};

export default EpisodeId;
