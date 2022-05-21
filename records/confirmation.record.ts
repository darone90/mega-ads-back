import {ConfirmationType} from "../types/confirmation";
import {makeLink} from "../utils/linkMaker";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type ConfirmationRecordResults = [ConfirmationType[], FieldPacket[]];


export class ConfirmationRecord implements ConfirmationType{
    public id: string;
    public link: string;

    constructor(obj: ConfirmationType) {
        this.id = obj.id;
        this.link = obj.link
    }

    async save ():Promise<string> {
        if(!this.link){
            this.link = makeLink(40)
        };

        await pool.execute("INSERT INTO `confirmation`(`id`, `link`) VALUES (:id, :link)", {
            id: this.id,
            link: this.link
        })

        return this.link
    }

    static async confirm (link: string):Promise<boolean> {

            const[results] = await pool.execute("SELECT * FROM `confirmation` WHERE link = :link", {
                link,
            }) as ConfirmationRecordResults

            if(results.length > 0) {
                const conf = new ConfirmationRecord(results[0]);
                const id = conf.id

                await pool.execute("UPDATE `ads` SET `accepted` = 1 WHERE `id` = :id", {
                    id,
                })

                await pool.execute("DELETE FROM `confirmation` WHERE `link` = :link", {
                    link,
                })

                return true
            } else {
                return false
            }
    }

    static async remove (id: string): Promise<void>{
        await pool.execute("DELETE FROM `confirmation` WHERE `id` = :id", {
            id,
        })
    }
 }