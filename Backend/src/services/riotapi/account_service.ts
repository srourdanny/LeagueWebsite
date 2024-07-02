import AccountDto from "../../models/riot/account_dto";
import RiotAccount from "../../models/riot_account";
import riotapi from '../riotapi';
import {db} from '../../db';

//TODO: thinking about encapsulating these functions into DB and riot api
async function getAccountByRiotId(gameName: string, tagLine: string) : Promise<AccountDto> {
    let response = await riotapi.get<AccountDto>(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    return response.data;
}

async function getAccountByPuuid(puuid: string) : Promise<AccountDto> {
    let response = await riotapi.get<AccountDto>(`/riot/account/v1/accounts/by-puuid/${puuid}`);
    return response.data;
}

async function getRiotAccountFromDb(gameName: string, tagLine: string) : Promise<RiotAccount | null> {
    return await db.oneOrNone('SELECT * FROM league.RiotAccount WHERE GameName = $1 AND TagLine = $2', [gameName, tagLine]);
}

async function getRiotAccountByPuuidFromDb(puuid: string) : Promise<RiotAccount | null> {
    return await db.oneOrNone('SELECT * FROM league.RiotAccount WHERE Puuid = $1', puuid);
}

async function saveRiotAccount(account: AccountDto) : Promise<RiotAccount> {
    return await db.one('INSERT INTO league.RiotAccount (Puuid, GameName, TagLine) VALUES ($/puuid/, $/gameName/, $/tagLine/) RETURNING Id, Puuid, GameName, TagLine', account)
}

async function updateRiotAccount(account: AccountDto) : Promise<RiotAccount> {
    return await db.one('UPDATE league.RiotAccount SET Puuid = $/puuid/, GameName = $/gameName/, TagLine = $/tagLine/ RETURNING Id, Puuid, GameName, TagLine', account)
}

async function getRiotAccount(gameName: string, tagLine: string) : Promise<RiotAccount> {
    let dbAccount = await getRiotAccountFromDb(gameName, tagLine);
    if(dbAccount) {
        return dbAccount;
    }
    let accountDto = await getAccountByRiotId(gameName, tagLine);
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