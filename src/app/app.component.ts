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

  constructor(private favoritesService: FavoritesService) {
    // Suscríbete a los cambios en el personaje seleccionado
    this.favoritesService.selectedFavorite$.subscribe(character => {
      this.selectedCharacter = character;
    });
  }

  onCharacterSelected(character: Character) {
    this.selectedCharacter = character;
  }
}