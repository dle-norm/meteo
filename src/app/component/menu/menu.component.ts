import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  navOpen: string = '';

  constructor (
  ) {}

  /**
   * Enregistre le nom du menu à ouvrir
   * Supprime le nom enregistré si c'est le même que celui du menu à ouvrir
   * @param navName Nom du menu à ouvrir
   */
  openNav (navName: string): void {
    if (this.navOpen === navName) {
      this.closeNav();
    } else {
      this.navOpen = navName;
    }
  }

  /**
   * Delete the current name menu, to not reopen it
   */
  closeNav (): void {
    this.navOpen = '';
  }
}
