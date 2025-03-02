import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites: Character[] = [];

  constructor(private favoritesService: FavoritesService) {
    // Suscríbete a los cambios en la lista de favoritos
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  // Método para manejar el clic en un favorito
  onFavoriteClick(character: Character) {
    this.favoritesService.selectFavorite(character); // Emite el personaje seleccionado
  }
}