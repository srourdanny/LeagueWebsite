export interface MatchDto {
    metadata: MetadataDto,
    info: InfoDto
}
export interface MetadataDto {
    dataVersion: string,
    matchId: string,
    participants: string[]
}
export interface InfoDto {
    endOfGameResult: string,
    gameCreation: number,
    gameDuration: number,
    gameEndTimestamp: number,
    gameId: number
    //...
}