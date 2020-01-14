import { Directive, Self, Output, EventEmitter, Input, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import compare from 'just-compare';

///this directive ensures that the date value will always be the moment.
@Directive({
    selector: '[datePickerMomentModifier]'
})
export class DatePickerMomentModifierDirective implements OnDestroy, OnChanges {
    @Input() date = new EventEmitter();
    @Output() dateChange = new EventEmitter();

    subscribe: Subscription;
    lastDate: Date = null;

    constructor(@Self() private bsDatepicker: BsDatepickerDirective) {
        this.subscribe = bsDatepicker.bsValueChange
            .pipe(filter(date => !!(date && date instanceof Date && !compare(this.lastDate, date) && date.toString() !== 'Invalid Date')))
            .subscribe((date: Date) => {
                this.lastDate = date;
                this.dateChange.emit(moment(date));
            });
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    ngOnChanges({ date }: SimpleChanges) {
        if (date && date.currentValue && !compare(date.currentValue, date.previousValue)) {
            setTimeout(() => this.bsDatepicker.bsValue = new Date(date.currentValue), 0);
        }
    }
}
