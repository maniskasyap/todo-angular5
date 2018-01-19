import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map } from "rxjs/operators";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./pokemon-seed";

@Injectable()
export class PokemonService {
  private baseUrl = "https://super-crud.herokuapp.com/pokemon";
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(this.baseUrl)
      .pipe(
        map(data => data["pokemons"]),
        catchError(this.handleError("getPokemons", []))
      );
  }

  getPokemonById(id: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<Pokemon>(url)
      .pipe(catchError(this.handleError<Pokemon>(`getPokemonById = ${id}`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
