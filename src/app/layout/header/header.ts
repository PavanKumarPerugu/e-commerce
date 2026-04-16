import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
  import { HeaderActions } from './../header-actions/header-actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, HeaderActions],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {}