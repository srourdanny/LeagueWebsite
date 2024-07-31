--Account table
DROP TABLE IF EXISTS league.RiotAccount;
CREATE TABLE league.RiotAccount (
    Id bigint PRIMARY KEY generated always as identity,
    Puuid VARCHAR(255),
    GameName VARCHAR(255),
    TagLine VARCHAR(255)
);

--MetadataDto and InfoDtos
DROP TABLE IF EXISTS league.Match;
CREATE TABLE league.Match (
    Id bigint PRIMARY KEY generated always as identity,
    MatchId VARCHAR(255),
    DataVersion VARCHAR(255),
    EndOfGameResult VARCHAR(255),
    GameCreation bigint,
    GameDuration bigint,
    GameEndTimestamp bigint,
    GameId bigint,
    GameMode VARCHAR(255),
    GameStartTimestamp bigint,
    GameType VARCHAR(255),
    GameVersion VARCHAR(255),
    MapId int,
    PlatformId VARCHAR(255),
    QueueId int,
    --LINK table for teams. DONE
    TournamentCode VARCHAR(255)
    --do we need a participants link??
);

--participants dto
DROP TABLE IF EXISTS league.Participant;
CREATE TABLE league.Participant (
    Id bigint PRIMARY KEY generated always as identity,
    AllInPings int,
    AssistMePings int,
    Assists int,
    BaronKills int,
    BountyLevel int,
    ChampExperience int,
    ChampLevel int,
    ChampionId int
    ChampionName VARCHAR(255),
    CommandPings int,
    ChampionTransform int,
    ConsumablesPurchased int
    --LINK table for challenges. DONE
    DamageDealtToBuildings int,
    DamageDealtToObjectives int,
    DamageDealtToTurrets int,
    DamageSelfMitigated int,
    Deaths int,
    DetectorWardsPlaced int,
    DoubleKills int,
    DragonKills int,
    EligibleForProgression boolean,
    EnemyMissingPings int,
    EnemyVisionPings int,
    FirstBloodAssist boolean,
    FirstBloodKill boolean,
    FirstTowerAssist boolean,
    FirstTowerKill boolean,
    GameEndedInEarlySurrender boolean,
    GameEndedInSurrender boolean,
    HoldPings int,
    GetBackPings int,
    GoldEarned int,
    GoldSpent int,
    IndividualPosition VARCHAR(255),
    InhibitorKills int,
    InhibitorTakedowns int,
    InhibitorsLost int,
    Item0 int,
    Item1 int,
    Item2 int,
    Item3 int,
    Item4 int,
    Item5 int,
    Item6 int,
    ItemsPurchased int,
    KillingSprees int,
    Kills int,
    Lane VARCHAR(255),
    LargestCriticalStrike int,
    LargestKillingSpree int,
    LargestMultiKill int,
    LongestTimeSpentLiving int,
    MagicDamageDealt int,
    MagicDamageDealtToChampions int,
    MagicDamageTaken int,
    --LINK table for missions. DONE
    NeutralMinionsKilled int,
    NeedVisionPings int,
    NexusKills int,
    NexusTakedowns int,
    NexusLost int,
    ObjectivesStolen int,
    ObjectivesStolenAssists int,
    OnMyWayPings int,
    ParticipantId int,
    PlayerScore0 int,
    PlayerScore1 int,
    PlayerScore2 int,
    PlayerScore3 int,
    PlayerScore4 int,
    PlayerScore5 int,
    PlayerScore6 int,
    PlayerScore7 int,
    PlayerScore8 int,
    PlayerScore9 int,
    PlayerScore10 int,
    PlayerScore11 int,
    PentaKills int,
    --LINK table for perks
    PhysicalDamageDealt int,
    PhysicalDamageDealtToChampions int,
    PhysicalDamageTaken int,
    Placement int,
    PlayerAugment1 int,
    PlayerAugment2 int,
    PlayerAugment3 int,
    PlayerAugment4 int,
    PlayerSubteamId int,
    PushPings int,
    ProfileIcon int,
    Puuid VARCHAR(255),
    QuadraKills int,
    RiotIdGameName VARCHAR(255),
    RiotIdName VARCHAR(255),
    RiotIdTagline VARCHAR(255),
    GameRole VARCHAR(255),
    SightWardsBoughtInGame int,
    Spell1Casts int,
    Spell2Casts int,
    Spell3Casts int,
    Spell4Casts int,
    SubteamPlacement int,
    Summoner1Casts int,
    Summoner1Id int,
    Summoner2Casts int,
    Summoner2Id int,
    SummonerId VARCHAR(255),
    SummonerLevel int,
    SummonerName VARCHAR(255),
    TeamEarlySurrendered boolean,
    TeamId int,
    TeamPosition VARCHAR(255),
    TimeCCingOthers int,
    TimePlayed int,
    TotalAllyJungleMinionsKilled int,
    TotalDamageDealt int,
    TotalDamageDealtToChampions int,
    TotalDamageShieldedOnTeammates int,
    TotalDamageTaken int,
    TotalEnemyJungleMinionsKilled int,
    TotalHeal int,
    TotalHealsOnTeammates int,
    TotalMinionsKilled int,
    TotalTimeCCDealt int,
    TotalTimeSpentDead int,
    TotalUnitsHealed int,
    TripleKills int,
    TrueDamageDealt int,
    TrueDamageDealtToChampions int,
    TrueDamageTaken int,
    TurretKills int,
    TurretTakedowns int,
    TurretsLost int,
    UnrealKills int,
    VisionScore int,
    VisionClearedPings int,
    VisionWardsBoughtInGame int,
    WardsKilled int,
    WardsPlaced int,
    Win boolean
);

--challengesdto
DROP TABLE IF EXISTS league.Challenges;
CREATE TABLE league.Challenges (
    Id bigint PRIMARY KEY generated always as identity,
    AssistStreakCount int,
    BaronBuffGoldAdvantageOverThreshold int,
    ControlWardTimeCoverageInRiverOrEnemyHalf float,
    EarliestBaron int,
    EarliestDragonTakedown int,
    EarliestElderDragon int,
    EarlyLaningPhaseGoldExpAdvantage int,
    FasterSupportQuestCompletion int,
    FastestLegendary int,
    HadAfkTeammate int,
    HighestChampionDamage int,
    HighestCrowdControlScore int,
    HighestWardKills int,
    JunglerKillsEarlyJungle int,
    KillsOnLanersEarlyJungleAsJungler int,
    LaningPhaseGoldExpAdvantage int,
    LegendaryCount int,
    MaxCsAdvantageOnLaneOpponent float,
    MaxLevelLeadLaneOpponent int,
    MostWardsDestroyedOneSweeper int,
    MythicItemUsed int,
    PlayedChampSelectPosition int,
    SoloTurretsLategame int,
    TakedownsFirst25Minutes int,
    TeleportTakedowns int,
    ThirdInhibitorDestroyedTime int,
    ThreeWardsOneSweeperCount int,
    VisionScoreAdvantageLaneOpponent float,
    InfernalScalePickup int,
    FistBumpParticipation int,
    VoidMonsterKill int,
    AbilityUses int,
    AcesBefore15Minutes int,
    AlliedJungleMonsterKills float,
    BaronTakedowns int,
    BlastConeOppositeOpponentCount int,
    BountyGold int,
    BuffsStolen int,
    CompleteSupportQuestInTime int,
    ControlWardsPlaced int,
    DamagePerMinute float,
    DamageTakenOnTeamPercentage float,
    DancedWithRiftHerald int,
    DeathsByEnemyChamps int,
    DodgeSkillShotsSmallWindow int,
    DoubleAces int,
    DragonTakedowns int,
    --legendaryItemUsed	List[int]
    EffectiveHealAndShielding float,
    ElderDragonKillsWithOpposingSoul int,
    ElderDragonMultikills int,
    EnemyChampionImmobilizations int,
    EnemyJungleMonsterKills float,
    EpicMonsterKillsNearEnemyJungler int,
    EpicMonsterKillsWithin30SecondsOfSpawn int,
    EpicMonsterSteals int,
    EpicMonsterStolenWithoutSmite int,
    FirstTurretKilled int,
    FirstTurretKilledTime float,
    FlawlessAces int,
    FullTeamTakedown int,
    GameLength float,
    GetTakedownsInAllLanesEarlyJungleAsLaner int,
    GoldPerMinute float,
    HadOpenNexus int,
    ImmobilizeAndKillWithAlly int,
    InitialBuffCount int,
    InitialCrabCount int,
    JungleCsBefore10Minutes float,
    JunglerTakedownsNearDamagedEpicMonster int,
    KDA float,
    KillAfterHiddenWithAlly int,
    KilledChampTookFullTeamDamageSurvived int,
    KillingSprees int,
    KillParticipation float,
    KillsNearEnemyTurret int,
    KillsOnOtherLanesEarlyJungleAsLaner int,
    KillsOnRecentlyHealedByAramPack int,
    KillsUnderOwnTurret int,
    KillsWithHelpFromEpicMonster int,
    KnockEnemyIntoTeamAndKill int,
    KTurretsDestroyedBeforePlatesFall int,
    LandSkillShotsEarlyGame int,
    LaneMinionsFirst10Minutes int,
    LostAnInhibitor int,
    MaxKillDeficit int,
    MejaisFullStackInTime int,
    MoreEnemyJungleThanOpponent float,
    MultiKillOneSpell int,
    Multikills int,
    MultikillsAfterAggressiveFlash int,
    MultiTurretRiftHeraldCount int,
    OuterTurretExecutesBefore10Minutes int,
    OutnumberedKills int,
    OutnumberedNexusKill int,
    PerfectDragonSoulsTaken int,
    PerfectGame int,
    PickKillWithAlly int,
    PoroExplosions int,
    QuickCleanse int,
    QuickFirstTurret int,
    QuickSoloKills int,
    RiftHeraldTakedowns int,
    SaveAllyFromDeath int,
    ScuttleCrabKills int,
    ShortestTimeToAceFromFirstTakedown float,
    SkillshotsDodged int,
    SkillshotsHit int,
    SnowballsHit int,
    SoloBaronKills int,
    SoloKills int,
    StealthWardsPlaced int,
    SurvivedSingleDigitHpCount int,
    SurvivedThreeImmobilizesInFight int,
    TakedownOnFirstTurret int,
    Takedowns int,
    TakedownsAfterGainingLevelAdvantage int,
    TakedownsBeforeJungleMinionSpawn int,
    TakedownsFirstXMinutes int,
    TakedownsInAlcove int,
    TakedownsInEnemyFountain int,
    TeamBaronKills int,
    TeamDamagePercentage float,
    TeamElderDragonKills int,
    TeamRiftHeraldKills int,
    TookLargeDamageSurvived int,
    TurretPlatesTaken int,
    TurretsTakenWithRiftHerald int,
    TurretTakedowns int,
    TwentyMinionsIn3SecondsCount int,
    TwoWardsOneSweeperCount int,
    UnseenRecalls int,
    VisionScorePerMinute float,
    WardsGuarded int,
    WardTakedowns int,
    WardTakedownsBefore20M int,
    ParticipantsId bigint references participants(Id) 
);

--missionsdto
DROP TABLE IF EXISTS league.Missions;
CREATE TABLE league.Missions (
    Id bigint PRIMARY KEY generated always as identity,
    PlayerScore0 int,
    PlayerScore1 int,
    PlayerScore2 int,
    PlayerScore3 int,
    PlayerScore4 int,
    PlayerScore5 int,
    PlayerScore6 int,
    PlayerScore7 int,
    PlayerScore8 int,
    PlayerScore9 int,
    PlayerScore10 int,
    PlayerScore11 int,
    ParticipantsId bigint references participants(Id) 
);
DROP TABLE IF EXISTS league.Teams;
CREATE TABLE league.Teams (
    Id bigint PRIMARY KEY generated always as identity,
    Teamid int,
    Win boolean,
    MatchId bigint references league.Match(Id), --this will point to match.id
    -- need bans and objective lists.


);
DROP TABLE IF EXISTS league.Perks;
CREATE TABLE league.Perks (
    Id bigint PRIMARY KEY generated always as identity,
    --link stat perks. DONE
    --link styles
    ParticipantId bigint references Participants(Id) -- points to participants
);

DROP TABLE IF EXISTS league.PerksStats;
CREATE TABLE league.PerksStats (
    Id bigint PRIMARY KEY generated always as identity,
    Defense int,
    Flex int,
    Offense int
    PerksId bigint references Perks(Id) -- points to Perks
);

DROP TABLE IF EXISTS league.PerksStyle;
CREATE TABLE league.PerksStyle (
    Id bigint PRIMARY KEY generated always as identity,
    DescriptionPerkStyle varchar(255),
    --link selections to PerkStyleSelectionDto
    Style int
);

DROP TABLE IF EXISTS league.PerksStyleSelection;
CREATE TABLE league.PerkStyleSelection (
    Id bigint PRIMARY KEY generated always as identity,
    perk int,
    var1 int,
    var2 int,
    var3 int,
    PerksSelectionId bigint references PerksStyle(Id) -- points to perksstyle
);

DROP TABLE IF EXISTS league.TeamDto;
CREATE TABLE league.TeamDto (
    Id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    TeamId INT,
    Win BOOLEAN,
    MatchId BIGINT REFERENCES league.Match(Id)
);

DROP TABLE IF EXISTS league.BanDto;
CREATE TABLE league.BanDto (
    Id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ChampionId INT,
    PickTurn INT,
    TeamDtoId BIGINT REFERENCES league.TeamDto(Id)
);


DROP TABLE IF EXISTS league.ObjectivesDto;
CREATE TABLE league.ObjectivesDto (
    Id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    BaronId BIGINT REFERENCES league.ObjectiveDto(Id),
    ChampionId BIGINT REFERENCES league.ObjectiveDto(Id),
    DragonId BIGINT REFERENCES league.ObjectiveDto(Id),
    HordeId BIGINT REFERENCES league.ObjectiveDto(Id),
    InhibitorId BIGINT REFERENCES league.ObjectiveDto(Id),
    RiftHeraldId BIGINT REFERENCES league.ObjectiveDto(Id),
    TowerId BIGINT REFERENCES league.ObjectiveDto(Id),
    TeamDtoId BIGINT REFERENCES league.TeamDto(Id)
);

DROP TABLE IF EXISTS league.ObjectiveDto;
CREATE TABLE league.ObjectiveDto (
    Id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    First BOOLEAN,
    Kills INT
);


--everyone who played in the match
--might be able to link participants too
DROP TABLE IF EXISTS league.RiotAccountToMatch;
CREATE TABLE league.RiotAccountToMatch (
    Id bigint PRIMARY KEY generated always as identity,
    RiotAccountId bigint references league.RiotAccount(Id), --TODO foreign key
    MatchId bigint references league.Match(Id), --TODO foreign
    ParticipantId bigint references league.participants(Id) --TODO foreign key
);
--

 --1-1
 --1-many
 --many-1
 --many-many