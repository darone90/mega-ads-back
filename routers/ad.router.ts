import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

adRouter

    .get('/search/:name?', async (req, res) => {
        console.log(req.params.name)
        const ads = await AdRecord.findAll(req.params.name ?? '');

        res.json(ads)
    })

    .get('/:id', async (req, res) => {
        console.log(req.params.id)
        const ad = await AdRecord.getOne(req.params.id);

        res.json(ad);
    })

    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        const id = await ad.save();

        res.json({id})
    })

