'use client'

import React, {useEffect, useState} from 'react';
import axiosInstance from "@/shared/libs/axios";
import {LocationTypes} from "@/app/types/location.types";
import Link from "next/link";
import Pagination from "@/shared/ui/pagination";
import Button from "@/shared/ui/button";

const Locations = () => {
    const itemPerPage:number=20
    const [locations, setLocations]=useState<LocationTypes[]>([]);
    const [totalCount, setTotalCount]=useState<number>(0)
    const [currentPage, setCurrentPage]=useState<number>(1)


    useEffect(() => {
        fetchLocations()
    }, [currentPage]);

    const fetchLocations = async ()=>{
        const response=await axiosInstance.get('/location', {
            params: {page: currentPage}
        })
        const data=response.data.results

        setLocations(data)
        setTotalCount(response.data.info.count)
    }

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Locations</h1>
                {locations.length > 0 ? (
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
                ) : (
                    <p className="text-center text-gray-500">No locations found.</p>
                )}
            </div>

            <Pagination paginate={setCurrentPage}
                        currentPage={currentPage}
                        itemsPerPage={itemPerPage}
                        totalItems={totalCount}/>
        </div>
    );
};

export default Locations;