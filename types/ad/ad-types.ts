export interface NewAdType extends Omit<AdTypes, 'id' | 'views' | "accepted"> {
    id?: string;
    accepted?: number;
    views?: number;
}
export interface SimpleAdEntity {
    lat: number;
    lon: number;
    id: string;
}
export interface AdTypes extends SimpleAdEntity{
    price: number;
    url: string;
    name: string;
    description: string;
    views: number;
    accepted: number;
}