import { MatchDto } from '../../models/riot/match_dto';
import riotapiWrapper from '../riotapi';
import { db } from '../../db';


async function getMatchesByPuuid(puuid: string): Promise<string[] | undefined> {
    let response = await riotapiWrapper.queueRequest(riotapi => riotapi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`));
    if (response.status == 200) {
        return response.data;
    } else {
        return undefined;
    }
}

async function getMatchByMatchId(matchId: string): Promise<MatchDto | undefined> {
    let response = await riotapiWrapper.queueRequest(riotapi => riotapi.get(`/lol/match/v5/matches/${matchId}`));
    if (response.status == 200) {
        return response.data;
    } else {
        return undefined;
    }
}

export async function testMatchService(puuid: string | undefined) {
    let testPuuid = puuid || `id6Sc1SaXB_Q9yM_0CD7rbHXPxyZJ7kmMWhjtbanMAW7ukmC7G1rSulxWTxEy7vuEBVII-gSTdJtKw`
    let test = await getMatchesByPuuid(testPuuid);
    if (test && test.length > 0) {
        console.log("Successfully obtained matches.")
    }
}