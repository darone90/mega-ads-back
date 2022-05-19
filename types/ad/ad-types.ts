export interface NewAdType extends Omit<AdTypes, 'id'> {
    id?: string
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
}