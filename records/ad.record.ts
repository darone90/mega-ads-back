import {AdTypes} from "../types";
import {ValidationError} from "../utils/error";

interface NewAdType extends Omit<AdTypes, 'id'> {
    id?: string
}

export class AdRecord implements AdTypes {
    public description: string;
    public id: string;
    public lat: number;
    public lon: number;
    public name: string;
    public price: number;
    public url: string;

    constructor(obj: NewAdType) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa nie może być pusta ani przekraczać 100 znaków')
        }

        if(obj.description.length > 1000) {
            throw new ValidationError('Treśc ogłoszenia nie może przekraczać 1000 znaków')
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena musi być więksaz niż 0 i mniejsza niż 9999999')
        }

        //@TODO: check if url is valid
        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link nie może być pusty ani przekraczać 100 znaków')
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;

    }
}