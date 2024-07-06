import AccountDto from "../../models/riot/account_dto";
import RiotAccount from "../../models/riot_account";
import riotapiWrapper from '../riotapi';
import {db} from '../../db';

//TODO: thinking about encapsulating these functions into DB and riot api
async function getAccountByRiotId(gameName: string, tagLine: string) : Promise<AccountDto | undefined> {
    //find way to URL encode gameName and tagLine
    let response = await riotapiWrapper.queueRequest(riotapi => riotapi.get<AccountDto>(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`));
    if (response.status == 200) {
        return response.data;
    } else {
        return undefined;
    }
}

async function getAccountByPuuid(puuid: string) : Promise<AccountDto | undefined> {
    let response = await riotapiWrapper.queueRequest(riotapi => riotapi.get<AccountDto>(`/riot/account/v1/accounts/by-puuid/${puuid}`));
    if (response.status == 200) {
        return response.data;
    } else {
        return undefined;
    }
}

function toRiotAccount(riotAccountRow: any) : RiotAccount {
    if (!riotAccountRow) {
        return riotAccountRow
    }
    return {
        id : riotAccountRow.id,
        puuid : riotAccountRow.puuid,
        gameName : riotAccountRow.gamename,
        tagLine : riotAccountRow.tagline
    }
}

async function getRiotAccountFromDb(gameName: string, tagLine: string) : Promise<RiotAccount | null> {
    return await db.oneOrNone('SELECT * FROM league.RiotAccount WHERE GameName = $1 AND TagLine = $2', [gameName, tagLine], toRiotAccount);
}

async function getRiotAccountByPuuidFromDb(puuid: string) : Promise<RiotAccount | null> {
    return await db.oneOrNone('SELECT * FROM league.RiotAccount WHERE Puuid = $1', puuid, toRiotAccount);
}

async function saveRiotAccount(account: AccountDto) : Promise<RiotAccount> {
    return await db.one('INSERT INTO league.RiotAccount (Puuid, GameName, TagLine) VALUES ($/puuid/, $/gameName/, $/tagLine/) RETURNING Id, Puuid, GameName, TagLine', account, toRiotAccount);
}

async function updateRiotAccount(account: AccountDto) : Promise<RiotAccount> {
    return await db.one('UPDATE league.RiotAccount SET GameName = $/gameName/, TagLine = $/tagLine/ WHERE Puuid = $/puuid/ RETURNING Id, Puuid, GameName, TagLine', account, toRiotAccount);
}

export async function getRiotAccount(gameName: string, tagLine: string) : Promise<RiotAccount | undefined> {
    let dbAccount = await getRiotAccountFromDb(gameName, tagLine);
    if(dbAccount) {
        return dbAccount;
    }
    let accountDto = await getAccountByRiotId(gameName, tagLine);
    if (!accountDto) {
        return undefined;
    }
    let accountByPuuid = await getRiotAccountByPuuidFromDb(accountDto.puuid);
    if (accountByPuuid) {
        return await updateRiotAccount(accountDto);
    }
    return await saveRiotAccount(accountDto);
}

export async function testAccountService(gameName: string | undefined, tagLine: string | undefined) {
    let testGameName = gameName || "Aoishingou";
    let testTagLine = tagLine || "NA1";
    let test = await getRiotAccount(testGameName, testTagLine);
    if (test && test.puuid
        && test.gameName == testGameName
        && test.tagLine == testTagLine
    ) {
        console.log("Successfully obtained account from account service!");
    }
}