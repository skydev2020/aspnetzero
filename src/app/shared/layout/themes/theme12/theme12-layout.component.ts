import { Injector, Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ThemesLayoutBaseComponent } from '@app/shared/layout/themes/themes-layout-base.component';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { OffcanvasOptions } from '@metronic/app/core/_base/layout/directives/offcanvas.directive';
import { LayoutRefService } from '@metronic/app/core/_base/layout/services/layout-ref.service';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './theme12-layout.component.html',
    selector: 'theme12-layout',
    animations: [appModuleAnimation()]
})
export class Theme12LayoutComponent extends ThemesLayoutBaseComponent implements OnInit, AfterViewInit {

    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;
    toggle: any;

    menuCanvasOptions: OffcanvasOptions = {
        baseClass: 'kt-aside',
        overlay: true,
        closeBy: 'kt_aside_close_btn',
        toggleBy: [{
            target: 'kt_aside_mobile_toggler',
            state: 'kt-header-mobile__toolbar-toggler--active'
        }]
    };

    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(
        injector: Injector,
        private layoutRefService: LayoutRefService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.installationMode = UrlHelper.isInstallUrl(location.href);
    }

    ngAfterViewInit(): void {
        this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
        this.initAsideToggler();
        this.initResizeHandler();
    }

    initAsideToggler(): void {
        this.toggle = new KTToggle('kt_aside_toggler', {
            target: 'body',
            targetState: 'kt-aside--minimize',
            togglerState: 'kt-aside__brand-aside-toggler--active'
        });
    }

    //Resolves https://github.com/aspnetzero/aspnet-zero-core/issues/2832.
    initResizeHandler() {
        //copy of offcanvas.js window resize code part with 100ms delayed. Workaround
        const element = KTUtil.get('kt_aside');
        KTUtil.addResizeHandler(function () {
            setTimeout(function () {
                if (parseInt(KTUtil.css(element, 'left')) >= 0 || parseInt(KTUtil.css(element, 'right')) >= 0 || KTUtil.css(element, 'position') !== 'fixed') {
                    KTUtil.css(element, 'opacity', '1');
                }
            }, 100);
        });
    }
}
