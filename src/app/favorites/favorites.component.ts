import { Component, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites: Character[] = [];
  @Output() favoriteSelected = new EventEmitter<Character>(); // Emite el personaje seleccionado

  constructor(private favoritesService: FavoritesService) {
    // Suscríbete a los cambios en la lista de favoritos
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  // Método para eliminar un favorito
  removeFavorite(character: Character) {
    this.favoritesService.removeFavorite(character);
  }

  // Método para seleccionar un favorito
  selectFavorite(character: Character) {
    this.favoriteSelected.emit(character); // Emite el personaje seleccionado
  }
}