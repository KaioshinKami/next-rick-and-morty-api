'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/(store)/store';
import { fetchEpisodes } from '@/entities/reducers/ActionCreators';
import EpisodesList from "@/shared/ui/episodesList";
import Loader from "@/shared/ui/Loader";

const Episodes = () => {
    const itemsPerPage: number = 20;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const dispatch = useDispatch<AppDispatch>();
    const { episodes, totalCount, isLoading, error } = useSelector((state: RootState) => state.episode);

    useEffect(() => {
        dispatch(fetchEpisodes(currentPage));
    }, [currentPage, dispatch]);

    return (
        <div>
            <EpisodesList
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalCount={totalCount}
                setCurrentPage={setCurrentPage}
                episodes={episodes}
            />

            {isLoading && <Loader />}
            {error && <h1 className='text-3xl text-center font-semibold mt-48'>{error}</h1>}
        </div>
    );
};

export default Episodes;
