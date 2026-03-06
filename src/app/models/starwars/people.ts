export interface PeopleResponse {
    count: number;
    next: string;
    previous: string;
    results: People[];
}

export interface People {
    name: string;
    height: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string;
    homeworld: string;
    films: string[];
    vehicles: string[];
}