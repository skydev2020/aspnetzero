// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

export interface OffcanvasOptions {
    baseClass: string;
    overlay?: boolean;
    closeBy: string;
    toggleBy?: any;
}

/**
 * Setup off Convas
 */
@Directive({
    selector: '[ktOffcanvas]',
    exportAs: 'ktOffcanvas'
})
export class OffcanvasDirective implements AfterViewInit {
    // Public properties
    @Input() options: OffcanvasOptions;
    // Private properties
    private offcanvas: any;

    /**
     * Directive Constructor
     * @param el: ElementRef
     */
    constructor(
        private el: ElementRef,
        private router: Router
    ) {}

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.offcanvas = new KTOffcanvas(this.el.nativeElement, this.options);

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                if (KTUtil.isMobileDevice()) {
                    this.offcanvas.hide();
                }
            });
    }

    /**
     * Returns the offCanvas
     */
    getOffcanvas() {
        return this.offcanvas;
    }
}
