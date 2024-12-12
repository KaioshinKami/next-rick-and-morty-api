'use client'

import React, {useEffect, useState} from 'react';
import axiosInstance from "@/shared/libs/axios";
import {CharacterType} from "@/app/types/characters.types";
import {useParams} from "next/navigation";
import CharactersList from "@/shared/ui/charactersList";
import Loader from "@/shared/ui/Loader";

const Page = () => {
    const {id}=useParams()
    const [characters, setCharacters]=useState<CharacterType[]>([])

    useEffect(() => {
        fetchLocationsId()
    }, []);

    const fetchLocationsId = async ()=>{
        try {
            const response = await axiosInstance.get(`/location/${id}`)
            const residents = response.data.residents
            const fetchResidents = residents.map((resident) => axiosInstance(resident))
            const residentResponse= await Promise.all(fetchResidents)
            const dataMap=residentResponse.map((data)=>data.data)

            setCharacters(dataMap)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {characters.length > 0
                ? <CharactersList characters={characters}/>
                : <Loader/>
            }
        </div>
    );
};

export default Page;