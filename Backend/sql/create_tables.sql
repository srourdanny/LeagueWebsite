--Account table
DROP TABLE IF EXISTS league.RiotAccount;
CREATE TABLE RiotAccount (
    Id bigint PRIMARY KEY generated always as identity,
    Puuid VARCHAR(255),
    GameName VARCHAR(255),
    TagLine VARCHAR(255)
);

--MetadataDto and InfoDtos
CREATE TABLE Match (
    Id bigint PRIMARY KEY generated always as identity,
    MatchId VARCHAR(255)
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
    --LINK table for teams
    TournamentCode VARCHAR(255)
);

--everyone who played in the match
--might be able to link participants too
CREATE TABLE RiotAccountToMatch (
    Id bigint PRIMARY KEY generated always as identity,
    RiotAccountId bigint, --TODO foreign key
    MatchId bigint, --TODO foreign
    ParticipantId bigint --TODO foreign key
);

--

 --1-1
 --1-many
 --many-1
 --many-many