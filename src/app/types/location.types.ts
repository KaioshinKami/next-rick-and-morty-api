import {CharacterType} from "@/app/types/characters.types";

export interface LocationTypes{
    id:number,
    name:string,
    type:string,
    dimension:string,
    residents:CharacterType[],
    url:string,
}