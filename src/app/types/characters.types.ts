import {Status} from "@/app/enums/status.enum";
import {Gender} from "@/app/enums/gender.enum";
import {EpisodeType} from "@/app/types/episode.type";

type Resource ={
    name:string,
    url:string
}

export interface CharacterType{
    id:number,
    name:string,
    status:Status,
    species:string,
    type:string,
    gender:Gender,
    origin: Resource,
    location: Resource,
    episode:EpisodeType[]
    image: string;
    url: string;
    created: string;
}