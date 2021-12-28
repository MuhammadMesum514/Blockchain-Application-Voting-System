export interface poll extends pollForm{
    id: number;
    
    results:number[];
   
    voted:boolean;
}
export interface pollForm{
    Question:string;
    options:string[];
    thumbnail:string;
}
export interface PollVote{
    id:number;
    vote:number;
}
export interface voter{
    id:string; //voter id
    voted:number[];

}