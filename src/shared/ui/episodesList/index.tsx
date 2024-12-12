import React, {FC} from 'react';
import {EpisodeType} from "@/app/types/episode.type";
import Link from "next/link";
import Pagination from "@/shared/ui/pagination";

interface EpisodesListProps{
    itemsPerPage?: number,
    setCurrentPage?: number,
    currentPage?: number,
    totalCount?: number,
    episodes: EpisodeType[]
}

const EpisodesList:FC<EpisodesListProps> = (
    {
                          itemsPerPage,
                          setCurrentPage,
                          currentPage,
                          totalCount,
                          episodes
    }
    ) => {
    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Episodes</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {episodes.map((episode: EpisodeType) => (
                            <div
                                key={episode.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                                    {episode.id}.
                                    <Link href={`/episodes/${episode.id}`}> {episode.name} </Link>
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">Air Date: {episode.air_date}</p>
                                <p className="text-sm text-gray-600">Code: {episode.episode}</p>
                            </div>
                        ))}
                    </div>
            </div>

            <Pagination itemsPerPage={itemsPerPage}
                        paginate={setCurrentPage}
                        currentPage={currentPage}
                        totalItems={totalCount}
            />
        </div>
    );
};

export default EpisodesList;