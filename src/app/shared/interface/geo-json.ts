export interface GeoJson {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface GeoResponse {
    results: GeoJson[];
}
