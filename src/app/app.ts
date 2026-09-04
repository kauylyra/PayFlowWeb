import { Component } from '@angular/core';
import { Home } from './pages/home/home';
import { RouterOutlet } from "@angular/router";

@Component({
  imports: [Home, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
