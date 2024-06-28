import {AccountDto} from "../../models/riot/account_dto";
import riotapi from '../riotapi';

export async function getAccountByRiotId(gameName: string, tagLine: string) : Promise<AccountDto> {
    let response = await riotapi.get<AccountDto>(`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`);
    return response.data;
}

export async function testRiotApi() {
    let test = await getAccountByRiotId("Ray01", "NA1");
    if (test && test.puuid
        && test.gameName == "Ray 01"
        && test.tagLine == "NA1"
    ) {
        console.log("Successfully requested from the riot account api!");
    }
}