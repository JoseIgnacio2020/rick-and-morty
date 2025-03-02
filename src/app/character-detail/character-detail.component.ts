import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnChanges, OnDestroy {
  @Input() character: any; // Recibe el personaje seleccionado

  origin: any = null;
  originResident: any = null;
  location: any = null;
  locationResident: any = null;
  episode: string = 'No tiene episodios';

  private destroy$ = new Subject<void>(); // Para cancelar suscripciones

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    if (this.character) {
      this.loadOrigin();
      this.loadLocation();
      this.loadEpisode();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(); // Cancela todas las suscripciones
    this.destroy$.complete();
  }

  private loadOrigin() {
    if (this.character.origin.url) {
      this.http.get(this.character.origin.url)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.origin = data;
            if (data.residents.length > 0) {
              this.http.get(data.residents[0])
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (resident: any) => {
                    this.originResident = resident;
                  },
                  (error) => {
                    console.error('Error cargando el residente:', error);
                    this.originResident = { name: 'Desconocido' };
                  }
                );
            }
          },
          (error) => {
            console.error('Error cargando el origen:', error);
            this.origin = { name: 'Desconocido' };
          }
        );
    } else {
      this.origin = { name: 'Desconocido' };
    }
  }

  private loadLocation() {
    if (this.character.location.url) {
      this.http.get(this.character.location.url)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.location = data;
            if (data.residents.length > 0) {
              this.http.get(data.residents[0])
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (resident: any) => {
                    this.locationResident = resident;
                  },
                  (error) => {
                    console.error('Error cargando el residente:', error);
                    this.locationResident = { name: 'Desconocido' };
                  }
                );
            }
          },
          (error) => {
            console.error('Error cargando la ubicación:', error);
            this.location = { name: 'Desconocido' };
          }
        );
    } else {
      this.location = { name: 'Desconocido' };
    }
  }

  private loadEpisode() {
    if (this.character.episode.length > 0) {
      this.http.get(this.character.episode[0])
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.episode = data.name;
          },
          (error) => {
            console.error('Error cargando el episodio:', error);
            this.episode = 'No tiene episodios';
          }
        );
    }
  }
}