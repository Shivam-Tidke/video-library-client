export interface VideoContract
{
    _id:string;
    Title:string;
    URL:string;
    Description:string;
    Likes:number;
    Dislikes:number;
    Comments:string[];
    CategoryId:string;
    Views:number;
}