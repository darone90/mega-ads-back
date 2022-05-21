import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import {ConfirmationRecord} from "../records/confirmation.record";
import {sendActivationLink} from "../utils/mailSender";

export const adRouter = Router()

adRouter
    .get('/delete/:id', async (req, res) => {
        const id = req.params.id;
        await ConfirmationRecord.remove(id)
        await AdRecord.remove(id);
        res.json({message: 'Ogłosznie zostało usnięte'})
    })

    .get('/activation/:link', async (req, res) => {
        const link = req.params.link
        const update = await ConfirmationRecord.confirm(link);
        if(update) {
            res.json({message: 'Ogłoszenie zostało aktywowane'})
        } else {
            res.json({message: 'Ogłoszenie jest już aktywne lub wykorzystano nie poprawny link aktywacyjny'})
        }
})

    .get('/search/:name?', async (req, res) => {
        const ads = await AdRecord.findAll(req.params.name ?? '');

        res.json(ads)
    })

    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);

        res.json(ad);
    })

    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        const id = await ad.save();

        const adsConfirmation = new ConfirmationRecord({id})
        const link = await adsConfirmation.save();

        sendActivationLink(link, id);

        res.json({id})
    })

