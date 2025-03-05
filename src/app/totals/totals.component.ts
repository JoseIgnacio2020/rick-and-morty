import { Component, Input, OnChanges } from '@angular/core';
import { Character } from '../models/character';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnChanges {
  @Input() characters: Character[] = []; // Recibe los personajes de la página actual

  speciesTotals: { [key: string]: number } = {}; // Totales por especie
  typeTotals: { [key: string]: number } = {};    // Totales por tipo

  ngOnChanges() {
    this.calculateTotals(); // Calcula los totales cuando cambian los personajes
  }

  // Calcula los totales por especie y tipo
  calculateTotals() {
    this.speciesTotals = this.groupByAttribute('species');
    this.typeTotals = this.groupByAttribute('type');
  }

  // Agrupa los personajes por un atributo específico
  groupByAttribute(attribute: keyof Character): { [key: string]: number } {
    const totals: { [key: string]: number } = {};

    this.characters.forEach(character => {
      const key = String(character[attribute] || 'Unknown'); // Asegura que key sea una cadena
      totals[key] = (totals[key] || 0) + 1;
    });

    return totals;
  }

  // Método para obtener las claves de un objeto
  getKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }
}