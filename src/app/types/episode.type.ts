import {CharacterType} from "@/app/types/characters.types";

export interface EpisodeType{
    id:number,
    name:string,
    air_date:string,
    episode:string,
    characters:CharacterType[],
    url:string,
}