import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CharacterService } from '../services/characters.service';
import { FavoritesService } from '../services/favorites.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css']
})
export class CharactersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created', 'favorite'];
  dataSource = new MatTableDataSource<Character>([]);
  totalPages = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() characterSelected = new EventEmitter<Character>();
  @Output() charactersUpdated = new EventEmitter<Character[]>();

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    this.characterService.getCharacters(page).subscribe(response => {
      this.dataSource.data = response.results;
      this.totalPages = response.info.pages;
      if (this.paginator) {
        this.paginator.length = response.info.count;
      }
      this.charactersUpdated.emit(response.results);
    });
  }

  applyFilter(event: Event, filterType: keyof Character) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Character, filter: string) => {
      return String(data[filterType]).toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: any) {
    this.loadCharacters(event.pageIndex + 1);
  }

  selectCharacter(character: Character) {
    this.characterSelected.emit(character);
  }

  toggleFavorite(character: Character) {
    if (this.isFavorite(character)) {
      this.favoritesService.removeFavorite(character);
    } else {
      this.favoritesService.addFavorite(character);
    }
  }

  isFavorite(character: Character): boolean {
    return this.favoritesService.getFavorites().some(fav => fav.id === character.id);
  }
}