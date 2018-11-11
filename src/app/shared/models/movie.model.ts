import {Deserializable} from "./deserializable.model";

export class Movie implements Deserializable {
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  imdbID: string;
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

