import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';


import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-toolbar',

  imports: [RouterLink, MatToolbar, MatButton, TranslatePipe, LanguageSwitcher],

  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  protected readonly logoUrl =
    `${environment.logoDevBaseUrl}/${environment.organizationDomain}` +
    `?token=${environment.logoDevToken}&size=64`;
}
