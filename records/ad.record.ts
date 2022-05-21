import {AdTypes, NewAdType, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import{v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdTypes[], FieldPacket[]];

export class AdRecord implements AdTypes {

    public description: string;
    public id: string;
    public lat: number;
    public lon: number;
    public name: string;
    public price: number;
    public url: string;
    public views: number;
    public accepted: number;

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

        this.id = obj.id
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.accepted = obj.accepted;
        this.views = obj.views;

    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const[results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length > 0 ?
            new AdRecord(results[0])
            : null;
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search AND `accepted` = 1", {
            search: `%${name}%`
        }) as AdRecordResults

        return results.map(result => {
            const {id, lat, lon} = result;
            return {id, lat, lon}
        });
    }

    async save():Promise<string> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('cannot add to database an record witch is already existed')
        }
        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :price, :url, :lat, :lon)", {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lat: this.lat,
            lon: this.lon
        })

        return this.id
    }

    static async remove(id: string):Promise<void> {
        await pool.execute("DELETE FROM `ads` WHERE `id` = :id", {
            id,
        })
    }
}