import { Photo } from "./photo";

export class City {
  id: number;
  name: string;
  description: string;
  userId: number;
  dateAdded: string;
  photos: Photo[];
}
