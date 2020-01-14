import { Injector, Component, ViewEncapsulation, Inject } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: './theme12-brand.component.html',
    selector: 'theme12-brand',
    encapsulation: ViewEncapsulation.None
})
export class Theme12BrandComponent extends AppComponentBase {

    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.currentTheme.baseSettings.menu.asideSkin + '.svg';
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(
        injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) {
        super(injector);
    }

    clickTopbarToggle(): void {
        this.document.body.classList.toggle('m-topbar--on');
    }

    clickLeftAsideHideToggle(): void {
        this.document.body.classList.toggle('m-aside-left--hide');
    }
}
