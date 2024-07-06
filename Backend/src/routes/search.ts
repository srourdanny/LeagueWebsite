import { Request, Response} from "express";
import Router from "express-promise-router";
import { getRiotAccount } from "../services/riotapi/account_service";

const router = Router();

async function searchByGameName(req: Request, res: Response) {
    const rawName : string = req.body.search;

    //Parse gameName and tag
    let gameName : string;
    let tagLine : string
    if (rawName.indexOf('#') == -1) {
        gameName = rawName;
        tagLine = "NA1";
    } else {
        const pieces = rawName.split("#");
        gameName = pieces[0];
        tagLine = pieces[1];
    }

    const account = await getRiotAccount(gameName, tagLine);
    if (account) {
        res.send(`<div id="matchHistory"><p>Found account for ${account.gameName}#${account.tagLine}</p></div>`);
    } else {
        res.send(`<div id="matchHistory"><p>No matching account found for ${gameName}#${tagLine}</p></div>`)
    }
}

router.post('/', searchByGameName);

export default router;

