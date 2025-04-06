export interface VideoContract
{
    VideoId:number;
    Title:string;
    URL:string;
    Description:string;
    Likes:number;
    Dislikes:number;
    Comments:string[];
    CategoryId:number;
    Views:number;
}