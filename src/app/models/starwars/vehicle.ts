export interface VehicleResponse {
    count: number;
    next: string;
    previous: string;
    results: Vehicle[];
}


export interface Vehicle {
    name: string;
    cost_in_credits: number;
    cargo_capacity: number;
    crew: number;
    model: string;
    manufacturer: string;
    passengers: number;
    vehicle_class: string;
    films: string[];
}