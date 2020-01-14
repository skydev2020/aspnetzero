import { Injector, ElementRef, Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LayoutRefService } from '@metronic/app/core/_base/layout/services/layout-ref.service';
import { AppConsts } from '@shared/AppConsts';
import { OffcanvasOptions } from '@metronic/app/core/_base/layout/directives/offcanvas.directive';

@Component({
    templateUrl: './theme3-layout.component.html',
    selector: 'theme3-layout',
    animations: [appModuleAnimation()]
})
export class Theme3LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {

    @ViewChild('ktHeader', {static: true}) ktHeader: ElementRef;

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    menuCanvasOptions: OffcanvasOptions = {
        baseClass: 'kt-aside',
        overlay: true,
        closeBy: 'kt_aside_close_btn',
        toggleBy: [{
            target: 'kt_aside_mobile_toggler',
            state: 'kt-header-mobile__toolbar-toggler--active'
        }]
    };

    constructor(
        injector: Injector,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private layoutRefService: LayoutRefService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
    }

    ngAfterViewInit(): void {
        this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
    }
}
