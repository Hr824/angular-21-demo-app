import { disabled, maxLength, minLength, required, schema } from "@angular/forms/signals";
import { Book } from "./book";

export interface Author {
    Id: number;
    Firstname: string;
    Lastname: string;
    Books: Book[];
    BooksCount: number;
}



export const initialData: Author = {
    Id: 0,
    Firstname: '',
    Lastname: '',
    Books: [],
    BooksCount: 0
}


export const authorSchema = schema<Author>((schemaPath) => {
    //debounce(schemaPath, 2000);

    disabled(schemaPath.Id);

    required(schemaPath.Firstname, { message: "Firstname est obligatoire"});
    minLength(schemaPath.Firstname, 2, { message: "Minimum 2 caractères" });
    maxLength(schemaPath.Firstname, 12, { message: "Maximum 12 caractères" });

    required(schemaPath.Lastname, { message: "Lastname est obligatoire"});
    maxLength(schemaPath.Lastname, 10, { message: "Maximum 10 caractères" });
});