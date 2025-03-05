import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { expand, map, reduce } from 'rxjs/operators';
import { Character } from '../models/character';

interface APIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  // Obtiene todos los personajes de todas las páginas
  getAllCharacters(): Observable<Character[]> {
    return this.http.get<APIResponse>(`${this.apiUrl}`).pipe(
      expand(response => response.info.next ? this.http.get<APIResponse>(response.info.next) : of(null)),
      map(response => response ? response.results : []),
      reduce((acc, results) => acc.concat(results), [] as Character[])
    );
  }

  // Obtiene los personajes por página
  getCharacters(page: number = 1): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/?page=${page}`);
  }
}