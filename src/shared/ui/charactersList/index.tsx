'use client'

import React, {FC, useMemo, useState} from 'react';
import Loader from "@/shared/ui/Loader";
import Input from "@/shared/ui/Input";
import Link from "next/link";
import {CharacterType} from "@/app/types/characters.types";

interface CharactersProps{
    characters:CharacterType[],
    isLoading?:boolean
}

const CharactersList: FC<CharactersProps> = ({ characters, isLoading }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredCharacters = useMemo(() => {
        return characters
            .filter((character) =>
                character.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((character, index, self) => {
                if (self.findIndex(c => c.id === character.id) === index) {
                    return character;
                }
                return null;
            })
            .filter(Boolean);
    }, [searchQuery, characters]);

    return (
        <div className="container mx-auto p-4">
            <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Поиск"
                className="block w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Characters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCharacters.map((character:CharacterType) => (
                    <div
                        key={character.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                                {character.id}.
                                <Link href={`/characters/${character.id}`}>{character.name}</Link>
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-bold">Status:</span> {character.status}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-bold">Species:</span> {character.species}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-bold">Gender:</span> {character.gender}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-bold">Origin:</span> {character.origin.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && (
                <div className="text-center mt-4">
                    <Loader />
                </div>
            )}
        </div>
    );
};


export default CharactersList;