import { MatchDto } from '../../models/riot/match_dto';
import riotapiWrapper from '../riotapi';
import { db, pgphelpers } from '../../db';
import { start } from 'repl';


async function getMatchesByPuuid(puuid: string, startTime?: number, endTime?: number, count?: number): Promise<string[] | undefined> {
    let response = await riotapiWrapper.queueRequest(riotapi => riotapi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
        params: {
            startTime: startTime,
            endTime: endTime,
            count: count
        }
    }));
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

async function getRecentMatches(puuid: string) {


}

//Getting matches for new account (no matches pre-existing in the database)
//Getting recent matches (user requested)
//Weekly stat crunch (pull matches for the week)

//helper functions:
// - save match to database
// - get match from database

async function insertMatch(match: MatchDto) {
    db.tx(tx => {
        tx.none(`INSERT INTO league.Match (MatchId,DataVersion,EndOfGameResult,GameCreation,GameDuration,GameEndTimestamp,GameId,GameMode,
					GameStartTimeStamp,GameType,GameVersion,MapId,PlatformId,QueueId,TournamenCode)
					VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`, [match.metadata.matchId, match.metadata.dataVersion,
                        match.info.endOfGameResult, match.info.gameCreation, match.info.gameDuration, match.info.gameEndTimestamp,
                        match.info.gameId, match.info.gameMode, match.info.gameStartTimestamp, match.info.gameType, match.info.gameVersion,
                        match.info.mapId, match.info.platformId, match.info.queueId, match.info.tournamentCode
                    ]);
        
        const participantsColumnSet = new pgphelpers.ColumnSet(["AllInPings", "AssistMePings", "Assists", "BaronKills", "BountyLevel", "ChampExperience", "ChampLevel", "ChampionId",
            "ChampionName", "CommandPings", "ChampionTransform", "ConsumablesPurchased", "DamageDealtToBuildings", "DamageDealtToObjectives", "DamageDealtToTurrets",
            "DamageSelfMitigated", "Deaths", "DetectorWardsPlaced", "DoubleKills", "DragonKills", "EligibleForProgression", "EnemyMissingPings", "EnemyVisionPings",
            "FirstBloodAssist", "FirstBloodKill", "FirstTowerAssist", "FirstTowerKill", "GameEndedInEarlySurrender", "GameEndedInSurrender", "HoldPings", "GetBackPings",
            "GoldEarned", "GoldSpent", "IndividualPosition", "InhibitorKills", "InhibitorTakedowns", "InhibitorsLost", "Item0", "Item1", "Item2", "Item3", "Item4", "Item5", "Item6",
            "ItemsPurchased", "KillingSprees", "Kills", "Lane", "LargestCriticalStrike", "LargestKillingSpree", "LargestMultiKill", "LongestTimeSpentLiving", "MagicDamageDealt",
            "MagicDamageDealtToChampions", "MagicDamageTaken", "NeutralMinionsKilled", "NeedVisionPings", "NexusKills", "NexusTakedowns", "NexusLost", "ObjectivesStolen",
            "ObjectivesStolenAssists", "OnMyWayPings", "ParticipantId", "PlayerScore0", "PlayerScore1", "PlayerScore2", "PlayerScore3", "PlayerScore4", "PlayerScore5", "PlayerScore6",
            "PlayerScore7", "PlayerScore8", "PlayerScore9", "PlayerScore10", "PlayerScore11", "PentaKills", "PhysicalDamageDealt", "PhysicalDamageDealtToChampions",
            "PhysicalDamageTaken", "Placement", "PlayerAugment1", "PlayerAugment2", "PlayerAugment3", "PlayerAugment4", "PlayerSubteamId", "PushPings", "ProfileIcon", "Puuid",
            "QuadraKills", "RiotIdGameName", "RiotIdName", "RiotIdTagline", "GameRole", "SightWardsBoughtInGame", "Spell1Casts", "Spell2Casts", "Spell3Casts", "Spell4Casts",
            "SubteamPlacement", "Summoner1Casts","Summoner1Id", "Summoner2Casts", "Summoner2Id", "SummonerId", "SummonerLevel", "SummonerName", "TeamEarlySurrendered", "TeamId",
            "TeamPosition", "TimeCCingOthers", "TimePlayed", "TotalAllyJungleMinionsKilled", "TotalDamageDealt", "TotalDamageDealtToChampions", "TotalDamageShieldedOnTeammates",
            "TotalDamageTaken", "TotalEnemyJungleMinionsKilled", "TotalHeal", "TotalHealsOnTeammates", "TotalMinionsKilled", "TotalTimeCCDealt", "TotalTimeSpentDead",
            "TotalUnitsHealed", "TripleKills", "TrueDamageDealt", "TrueDamageDealtToChampions", "TrueDamageTaken", "TurretKills", "TurretTakedowns", "TurretsLost", "UnrealKills",
            "VisionScore", "VisionClearedPings", "VisionWardsBoughtInGame", "WardsKilled", "WardsPlaced", "Win"],
            {table: "league.Match"});
        const insertParticipantsQuery = pgphelpers.insert(match.info.participants, participantsColumnSet);
        tx.none(insertParticipantsQuery);
    });
    //save participants
    //save challenges
    //save missions
    //save teams
    //save perks
    //save perksstats
    //save perksstyle
    //save perkstyleselection
    //save riot account to match link
}


export async function testMatchService(puuid: string | undefined) {
    let testPuuid = puuid || `PaXDewdGlauCIJx8x46fh2EBqOPQPDLuO7HtgEjCpSamYr4wqImzw8geLiXIkEginrKZ7Cexs6OBSQ`
    let test = await getMatchesByPuuid(testPuuid);
    if (test && test.length > 0) {
        console.log("Successfully obtained matches.")
    }
}