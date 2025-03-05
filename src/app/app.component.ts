import { Component } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { Character } from './models/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCharacter: Character | null = null;
  characters: Character[] = [];

  constructor(private favoritesService: FavoritesService) {
    this.favoritesService.favorites$.subscribe((favorites: Character[]) => {
      console.log('Favoritos actualizados:', favorites);
    });
  }

  // Método para manejar el personaje seleccionado desde la tabla
  onCharacterSelected(character: Character) {
    this.selectedCharacter = character;
  }

  // Método para manejar los personajes de la página actual
  onCharactersUpdated(characters: Character[]) {
    this.characters = characters;
  }

  // Método para manejar el personaje seleccionado desde favoritos
  onFavoriteSelected(character: Character) {
    this.selectedCharacter = character;
  }
}