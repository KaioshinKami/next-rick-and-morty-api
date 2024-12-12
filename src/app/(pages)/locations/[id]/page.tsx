'use client'

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import CharactersList from "@/shared/ui/charactersList";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/redux";
import {fetchLocationsById} from "@/entities/reducers/ActionCreators";

const Page = () => {
    const {id}=useParams()

    const dispatch=useAppDispatch();
    const {characters, error, isLoading}=useAppSelector(state => state.location)

    useEffect(() => {
        if(id){
            dispatch(fetchLocationsById(Number(id)))
        }
    }, [id, dispatch]);



    return (
        <div>
            <CharactersList characters={characters}/>
        </div>
    );
};

export default Page;