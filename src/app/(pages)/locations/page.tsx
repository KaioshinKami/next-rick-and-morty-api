'use client'

import React, {useEffect, useState} from 'react';
import axiosInstance from "@/shared/libs/axios";
import {LocationTypes} from "@/app/types/location.types";
import Link from "next/link";
import Pagination from "@/shared/ui/pagination";
import Button from "@/shared/ui/button";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/redux";
import {fetchLocations} from "@/entities/reducers/ActionCreators";
import Loader from "@/shared/ui/Loader";

const Locations = () => {
    const itemPerPage:number=20
    const [currentPage, setCurrentPage]=useState<number>(1)

    const dispatch=useAppDispatch()
    const {locations, isLoading, error, totalCount}=useAppSelector(state => state.location)

    useEffect(() => {
        dispatch(fetchLocations(currentPage))
    }, [currentPage]);


    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Locations</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {locations.map((location) => (
                            <div
                                key={location.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{location.id}. {location.name}</h2>
                                <p className=" text-gray-600">Type: {location.type}</p>

                                <Link href={`/locations/${location.id}`}>
                                    <Button className="a-button--primary a-button--sm">Details</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
            </div>

            {isLoading && <Loader />}
            {error && <h1 className='text-3xl text-center font-semibold mt-48'>{error}</h1>}

            <Pagination paginate={setCurrentPage}
                        currentPage={currentPage}
                        itemsPerPage={itemPerPage}
                        totalItems={totalCount}/>
        </div>
    );
};

export default Locations;