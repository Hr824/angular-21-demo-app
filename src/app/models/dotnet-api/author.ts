import { Book } from "./book";

export interface Author {
    Id: number;
    Firstname: string;
    Lastname: string;
    Books: Book[];
    BooksCount: number;
}