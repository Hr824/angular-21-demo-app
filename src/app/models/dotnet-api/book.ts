import { Author } from "./author";

export interface Book {
    Id: number;
    Title: string;
    ReleaseDate: string;
    Genre: string;
    Price: number;
    Author: Author;
}