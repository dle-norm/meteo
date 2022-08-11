export interface MeteoJson {
    temperature_2m: number[];
    relativehumidity_2m: number[];
    time: string[];
}

export interface MeteoResponse {
    hourly: MeteoJson;

}
