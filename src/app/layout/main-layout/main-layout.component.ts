import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { ColdStartNotifierService } from 'src/app/core/services/cold-start-notifier.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {

  coldStartNotifier = inject(ColdStartNotifierService);

}