import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Character[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  // Agrega un personaje a favoritos
  addFavorite(character: Character) {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.some(fav => fav.id === character.id)) {
      this.favoritesSubject.next([...currentFavorites, character]);
    }
  }

  // Elimina un personaje de favoritos
  removeFavorite(character: Character) {
    const currentFavorites = this.favoritesSubject.value;
    this.favoritesSubject.next(currentFavorites.filter(fav => fav.id !== character.id));
  }

  // Obtiene la lista de favoritos
  getFavorites(): Character[] {
    return this.favoritesSubject.value;
  }
}