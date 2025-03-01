import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

interface APIResponse {
  info: { pages: number; next: string | null; prev: string | null };
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/?page=${page}`);
  }
}
