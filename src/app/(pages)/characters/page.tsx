'use client';

import { useEffect, useState } from "react";
import CharactersList from "@/shared/ui/charactersList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { fetchCharacters } from "@/entities/reducers/ActionCreators";

const Characters = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useAppDispatch();

    const { characters, isLoading } = useAppSelector((state) => state.character);

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
        </div>
    );
};

export default Characters;