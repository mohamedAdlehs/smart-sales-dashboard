import { Component, signal } from '@angular/core';
 import { RouterOutlet } from '@angular/router';
import { Dashboard } from "./features/dashboard/dashboard";
import { Navbar } from "./shared/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [ Navbar,RouterOutlet,Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smart-sales-dashboard');
}
