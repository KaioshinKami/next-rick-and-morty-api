'use client';

import React, { useEffect, useState } from "react";
import CharactersList from "@/shared/ui/charactersList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { fetchCharacters } from "@/entities/reducers/ActionCreators";
import Loader from "@/shared/ui/Loader";

const Characters = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useAppDispatch();

    const { characters, isLoading, error } = useAppSelector((state) => state.character);

    useEffect(() => {
        dispatch(fetchCharacters(currentPage));
    }, [currentPage, dispatch]);

    const handleScroll = (): void => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.offsetHeight - 100;

        if (scrollPosition >= threshold && !isLoading) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Слушатель скролла
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading]);

    return (
        <div>
            <CharactersList characters={characters} isLoading={isLoading} />
            {isLoading && <Loader />}
            {error && <h1 className='text-3xl text-center font-semibold mt-48'>{error}</h1>}
        </div>
    );
};

export default Characters;
