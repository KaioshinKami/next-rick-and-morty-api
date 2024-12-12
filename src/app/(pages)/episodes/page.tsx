'use client'

import React, {useEffect, useState} from 'react';
import axiosInstance from "@/shared/libs/axios";
import {EpisodeType} from "@/app/types/episode.type";
import Link from "next/link";
import Pagination from "@/shared/ui/pagination";
import EpisodesList from "@/shared/ui/episodesList";

const Episodes = () => {
    const itemsPerPage:number=20;
    const [currentPage, setCurrentPage]=useState<number>(1);
    const [totalCount, setTotalCount]=useState<number>(0)
    const [episodes, setEpisodes]=useState<EpisodeType[]>([])

    useEffect(()=>{
        fetchEpisodes()
    }, [currentPage])

    const fetchEpisodes = async ()=>{
        const response=await axiosInstance.get<EpisodeType>('/episode', {
            params: {page:currentPage}
        });

        setEpisodes(response.data.results)
        setTotalCount(response.data.info.count)
    }


    return (
        <div>
            <EpisodesList itemsPerPage={itemsPerPage}
                          currentPage={currentPage}
                          totalCount={totalCount}
                          setCurrentPage={setCurrentPage}
                          episodes={episodes}/>
        </div>
    );
};

export default Episodes;