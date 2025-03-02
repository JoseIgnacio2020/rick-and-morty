import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Character[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  private selectedFavoriteSubject = new BehaviorSubject<Character | null>(null);
  selectedFavorite$ = this.selectedFavoriteSubject.asObservable();

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

  // Selecciona un favorito
  selectFavorite(character: Character) {
    this.selectedFavoriteSubject.next(character);
  }
}