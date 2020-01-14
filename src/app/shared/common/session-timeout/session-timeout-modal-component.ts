import { Component, Injector, Output, ViewChild, OnDestroy } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { timer, Subscription } from 'rxjs';
import { AppAuthService } from '../auth/app-auth.service';

@Component({
    selector: 'session-timeout-modal',
    templateUrl: './session-timeout-modal.component.html'
})
export class SessionTimeoutModalComponent extends AppComponentBase implements OnDestroy {

    @ViewChild('modal', { static: true }) modal: ModalDirective;

    timeOutSecond = parseInt(this.s('App.UserManagement.SessionTimeOut.ShowTimeOutNotificationSecond')); // show inactivity modal when TimeOutSecond passed
    currentSecond: number;
    progresbarWidth = '100%';
    private subscription: Subscription;

    constructor(
        injector: Injector,
        private _appAuthService: AppAuthService
    ) {
        super(injector);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    start(): void {
        this.currentSecond = this.timeOutSecond;
        this.subscription = timer(0, 1000).subscribe(() => {
            this.changeNotifyContent();
        });
        this.modal.show();
    }

    stop(): void {
        this.currentSecond = this.timeOutSecond;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.modal.hide();
    }

    private done(): void {
        this.stop();
        this._appAuthService.logout(true);
    }

    private changeNotifyContent(): void {
        this.currentSecond--;
        if (this.currentSecond <= 0) {
            this.progresbarWidth = '0%';
            this.done();
        } else {
            this.progresbarWidth = (this.currentSecond / this.timeOutSecond * 100) + '%';
        }
    }
}
