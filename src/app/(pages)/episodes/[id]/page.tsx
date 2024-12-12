'use client'

import React, {useEffect, useState} from 'react';
import {CharacterType} from "@/app/types/characters.types";
import axiosInstance from "@/shared/libs/axios";
import {useParams} from "next/navigation";
import CharactersList from "@/shared/ui/charactersList";

const EpisodeId = () => {
    const {id}=useParams()
    const [characters, setCharacters]=useState<CharacterType>([])

    useEffect(() => {
        fetchEpisodesId()
    }, [id]);

    const fetchEpisodesId= async ()=>{
        try {
            const response = await axiosInstance(`/episode/${id}`);
            const data=response.data.characters
            const dataMap=data.map(url=>axiosInstance.get(url))
            const dataPromise=await Promise.all(dataMap)
            const residents=dataPromise.map(resident=>resident.data)

            setCharacters(residents)
        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            <CharactersList characters={characters}/>
        </div>
    );
};

export default EpisodeId;