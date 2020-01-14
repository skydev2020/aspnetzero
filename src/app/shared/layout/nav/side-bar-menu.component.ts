import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { Injector, ElementRef, Component, OnInit, ViewEncapsulation, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppMenu } from './app-menu';
import { AppNavigationService } from './app-navigation.service';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuOptions } from '@metronic/app/core/_base/layout/directives/menu.directive';

@Component({
    templateUrl: './side-bar-menu.component.html',
    selector: 'side-bar-menu',
    encapsulation: ViewEncapsulation.None
})
export class SideBarMenuComponent extends AppComponentBase implements OnInit, AfterViewInit {

    menu: AppMenu = null;

    currentRouteUrl = '';
    insideTm: any;
    outsideTm: any;

    menuOptions: MenuOptions = {
        // vertical scroll
        scroll: null,

        // submenu setup
        submenu: {
            desktop: {
                default: 'dropdown',
                state: {
                    body: 'kt-aside--minimize',
                    mode: 'dropdown'
                }
            },
            tablet: 'accordion', // menu set to accordion in tablet mode
            mobile: 'accordion' // menu set to accordion in mobile mode
        },

        // accordion setup
        accordion: {
            expandAll: false // allow having multiple expanded accordions in the menu
        }
    };

    constructor(
        injector: Injector,
        private el: ElementRef,
        private router: Router,
        public permission: PermissionCheckerService,
        private _appNavigationService: AppNavigationService,
        @Inject(DOCUMENT) private document: Document,
        private render: Renderer2) {
        super(injector);
    }

    ngOnInit() {
        this.menu = this._appNavigationService.getMenu();

        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => this.currentRouteUrl = this.router.url.split(/[?#]/)[0]);
    }

    ngAfterViewInit(): void {
        this.scrollToCurrentMenuElement();
    }

    showMenuItem(menuItem): boolean {
        return this._appNavigationService.showMenuItem(menuItem);
    }

    isMenuItemIsActive(item): boolean {
        if (item.items.length) {
            return this.isMenuRootItemIsActive(item);
        }

        if (!item.route) {
            return false;
        }

        // dashboard
        if (item.route !== '/' && this.currentRouteUrl.startsWith(item.route)) {
            return true;
        }

        return this.currentRouteUrl.replace(/\/$/, '') === item.route.replace(/\/$/, '');
    }

    isMenuRootItemIsActive(item): boolean {
        let result = false;

        for (const subItem of item.items) {
            result = this.isMenuItemIsActive(subItem);
            if (result) {
                return true;
            }
        }

        return false;
    }

    /**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
    mouseEnter(e: Event) {
        if (!this.currentTheme.baseSettings.menu.allowAsideMinimizing) {
            return;
        }

        // check if the left aside menu is fixed
        if (document.body.classList.contains('kt-aside--fixed')) {
            if (this.outsideTm) {
                clearTimeout(this.outsideTm);
                this.outsideTm = null;
            }

            this.insideTm = setTimeout(() => {
                // if the left aside menu is minimized
                if (document.body.classList.contains('kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
                    // show the left aside menu
                    this.render.removeClass(document.body, 'kt-aside--minimize');
                    this.render.addClass(document.body, 'kt-aside--minimize-hover');
                }
            }, 50);
        }
    }

    /**
     * Use for fixed left aside menu, to show menu on mouseenter event.
     * @param e Event
     */
    mouseLeave(e: Event) {
        if (!this.currentTheme.baseSettings.menu.allowAsideMinimizing) {
            return;
        }

        if (document.body.classList.contains('kt-aside--fixed')) {
            if (this.insideTm) {
                clearTimeout(this.insideTm);
                this.insideTm = null;
            }

            this.outsideTm = setTimeout(() => {
                // if the left aside menu is expand
                if (document.body.classList.contains('kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
                    // hide back the left aside menu
                    this.render.removeClass(document.body, 'kt-aside--minimize-hover');
                    this.render.addClass(document.body, 'kt-aside--minimize');
                }
            }, 100);
        }
    }

    scrollToCurrentMenuElement(): void {
        const path = location.pathname;
        const menuItem = document.querySelector('a[href=\'' + path + '\']');
        if (menuItem) {
            menuItem.scrollIntoView({ block: 'center' });
        }
    }
}
