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

        const participantsColumnSet = new pgphelpers.ColumnSet(["allinpings", "assistmepings", "assists", "baronkills", "bountylevel", "champexperience", "champlevel", "championid",
            "championname", "commandpings", "championtransform", "consumablespurchased", "damagedealttobuildings", "damagedealttoobjectives", "damagedealttoturrets",
            "damageselfmitigated", "deaths", "detectorwardsplaced", "doublekills", "dragonkills", "eligibleforprogression", "enemymissingpings", "enemyvisionpings",
            "firstbloodassist", "firstbloodkill", "firsttowerassist", "firsttowerkill", "gameendedinearlysurrender", "gameendedinsurrender", "holdpings", "getbackpings",
            "goldearned", "goldspent", "individualposition", "inhibitorkills", "inhibitortakedowns", "inhibitorslost", "item0", "item1", "item2", "item3", "item4", "item5", "item6",
            "itemspurchased", "killingsprees", "kills", "lane", "largestcriticalstrike", "largestkillingspree", "largestmultikill", "longesttimespentliving", "magicdamagedealt",
            "magicdamagedealttochampions", "magicdamagetaken", "neutralminionskilled", "needvisionpings", "nexuskills", "nexustakedowns", "nexuslost", "objectivesstolen",
            "objectivesstolenassists", "onmywaypings", "participantid", "playerscore0", "playerscore1", "playerscore2", "playerscore3", "playerscore4", "playerscore5", "playerscore6",
            "playerscore7", "playerscore8", "playerscore9", "playerscore10", "playerscore11", "pentakills", "physicaldamagedealt", "physicaldamagedealttochampions",
            "physicaldamagetaken", "placement", "playeraugment1", "playeraugment2", "playeraugment3", "playeraugment4", "playersubteamid", "pushpings", "profileicon", "puuid",
            "quadrakills", "riotidgamename", "riotidname", "riotidtagline", "gamerole", "sightwardsboughtingame", "spell1casts", "spell2casts", "spell3casts", "spell4casts",
            "subteamplacement", "summoner1casts", "summoner1id", "summoner2casts", "summoner2id", "summonerid", "summonerlevel", "summonername", "teamearlysurrendered", "teamid",
            "teamposition", "timeccingothers", "timeplayed", "totalallyjungleminionskilled", "totaldamagedealt", "totaldamagedealttochampions", "totaldamageshieldedonteammates",
            "totaldamagetaken", "totalenemyjungleminionskilled", "totalheal", "totalhealsonteammates", "totalminionskilled", "totaltimeccdealt", "totaltimespentdead",
            "totalunitshealed", "triplekills", "truedamagedealt", "truedamagedealttochampions", "truedamagetaken", "turretkills", "turrettakedowns", "turretslost", "unrealkills",
            "visionscore", "visionclearedpings", "visionwardsboughtingame", "wardskilled", "wardsplaced", "win"],
            { table: "league.Match" });
        const insertParticipantsQuery = pgphelpers.insert(match.info.participants, participantsColumnSet);
        tx.none(insertParticipantsQuery);


        match.info.participants.forEach(participant => {
            const challengesColumnSet = new pgphelpers.ColumnSet([
                "ParticipantId", "AssistStreakCount", "BaronBuffGoldAdvantageOverThreshold", "ControlWardTimeCoverageInRiverOrEnemyHalf",
                "EarliestBaron", "EarliestDragonTakedown", "EarliestElderDragon", "EarlyLaningPhaseGoldExpAdvantage", "FasterSupportQuestCompletion",
                "FastestLegendary", "HadAfkTeammate", "HighestChampionDamage", "HighestCrowdControlScore", "HighestWardKills",
                "JunglerKillsEarlyJungle", "KillsOnLanersEarlyJungleAsJungler", "LaningPhaseGoldExpAdvantage", "LegendaryCount",
                "MaxCsAdvantageOnLaneOpponent", "MaxLevelLeadLaneOpponent", "MostWardsDestroyedOneSweeper", "MythicItemUsed",
                "PlayedChampSelectPosition", "SoloTurretsLategame", "TakedownsFirst25Minutes", "TeleportTakedowns",
                "ThirdInhibitorDestroyedTime", "ThreeWardsOneSweeperCount", "VisionScoreAdvantageLaneOpponent", "InfernalScalePickup",
                "FistBumpParticipation", "VoidMonsterKill", "AbilityUses", "AcesBefore15Minutes", "AlliedJungleMonsterKills",
                "BaronTakedowns", "BlastConeOppositeOpponentCount", "BountyGold", "BuffsStolen", "CompleteSupportQuestInTime",
                "ControlWardsPlaced", "DamagePerMinute", "DamageTakenOnTeamPercentage", "DancedWithRiftHerald", "DeathsByEnemyChamps",
                "DodgeSkillShotsSmallWindow", "DoubleAces", "DragonTakedowns", "LegendaryItemUsed", "EffectiveHealAndShielding",
                "ElderDragonKillsWithOpposingSoul", "ElderDragonMultikills", "EnemyChampionImmobilizations", "EnemyJungleMonsterKills",
                "EpicMonsterKillsNearEnemyJungler", "EpicMonsterKillsWithin30SecondsOfSpawn", "EpicMonsterSteals", "EpicMonsterStolenWithoutSmite",
                "FirstTurretKilled", "FirstTurretKilledTime", "FlawlessAces", "FullTeamTakedown", "GameLength",
                "GetTakedownsInAllLanesEarlyJungleAsLaner", "GoldPerMinute", "HadOpenNexus", "ImmobilizeAndKillWithAlly", "InitialBuffCount",
                "InitialCrabCount", "JungleCsBefore10Minutes", "JunglerTakedownsNearDamagedEpicMonster", "Kda", "KillAfterHiddenWithAlly",
                "KilledChampTookFullTeamDamageSurvived", "KillingSprees", "KillParticipation", "KillsNearEnemyTurret",
                "KillsOnOtherLanesEarlyJungleAsLaner", "KillsOnRecentlyHealedByAramPack", "KillsUnderOwnTurret", "KillsWithHelpFromEpicMonster",
                "KnockEnemyIntoTeamAndKill", "KTurretsDestroyedBeforePlatesFall", "LandSkillShotsEarlyGame", "LaneMinionsFirst10Minutes",
                "LostAnInhibitor", "MaxKillDeficit", "MejaisFullStackInTime", "MoreEnemyJungleThanOpponent", "MultiKillOneSpell",
                "Multikills", "MultikillsAfterAggressiveFlash", "MultiTurretRiftHeraldCount", "OuterTurretExecutesBefore10Minutes",
                "OutnumberedKills", "OutnumberedNexusKill", "PerfectDragonSoulsTaken", "PerfectGame", "PickKillWithAlly", "PoroExplosions",
                "QuickCleanse", "QuickFirstTurret", "QuickSoloKills", "RiftHeraldTakedowns", "SaveAllyFromDeath", "ScuttleCrabKills",
                "ShortestTimeToAceFromFirstTakedown", "SkillshotsDodged", "SkillshotsHit", "SnowballsHit", "SoloBaronKills", "SoloKills",
                "StealthWardsPlaced", "SurvivedSingleDigitHpCount", "SurvivedThreeImmobilizesInFight", "SurvivedThreeEnemyChampsInFight",
                "TakedownOnFirstTurret", "Takedowns", "TakedownsAfterTakedownsBefore20Mins", "TakedownsBeforeJungleMinionSpawn",
                "TakedownsFirstXMinutes", "TakedownsInAlcove", "TakedownsInEnemyFountain", "TeamDamagePercentage",
                "TeamElderDragonKills", "TeamRiftHeraldKills", "ThreeWardsBoughtInGame", "TookLargeDamageSurvived",
                "TurretPlatesTaken", "TurretsTakenWithRiftHerald", "UnseenRecalls", "VisionScorePerMinute", "WardTakedowns",
                "WardTakedownsBefore20Mins", "WardsGuarded"
            ], { table: "league.Challenges" });

            const insertChallengesQuery = pgphelpers.insert(participant.challenges, challengesColumnSet);
            tx.none(insertChallengesQuery);
        });


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