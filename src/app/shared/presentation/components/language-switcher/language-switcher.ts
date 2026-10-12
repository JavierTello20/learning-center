import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButton],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.use('en');
  }

  protected changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
