import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CharacterService } from '../services/characters.service';

interface Character {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
}

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css']
})
export class CharactersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource = new MatTableDataSource<any>([]);
  totalPages = 0;
  currentPage = 1;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    this.characterService.getCharacters(page).subscribe(response => {
      this.dataSource.data = response.results;
      this.totalPages = response.info.pages;
      this.currentPage = page;
    });
  }

  onPageChange(event: any) {
    this.loadCharacters(event.pageIndex + 1);
  }
}
