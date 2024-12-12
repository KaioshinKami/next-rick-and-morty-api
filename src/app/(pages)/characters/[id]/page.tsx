'use client'

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import axiosInstance from "@/shared/libs/axios";
import EpisodesList from "@/shared/ui/episodesList";
import {EpisodeType} from "@/app/types/episode.type";

const CharacterId = () => {
    const {id}=useParams()
    const [episodes, setEpisodes]=useState<EpisodeType>([])

    useEffect(()=>{
        fetchCharacterId()
    }, [id])

    const fetchCharacterId= async ()=>{
        const response=await axiosInstance.get(`/character/${id}`)
        const data=response.data.episode
        const episode=data.map(url=>axiosInstance.get(url))
        const fetchEpisode=await Promise.all(episode)
        const responseEpisode=fetchEpisode.map(promises=>promises.data)

        console.log(responseEpisode)

        setEpisodes(responseEpisode)
    }

    return (
        <div>
            <EpisodesList episodes={episodes} />
        </div>
    );
};

export default CharacterId;