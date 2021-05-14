export interface Claim{
    id:string;
    roomId:string;
    name:string;
    claimProperties:string[][];
    priority:number;
}