import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import * as rtlDetect from 'rtl-detect';

export class PrimengTableHelper {
    predefinedRecordsCountPerPage = [5, 10, 25, 50, 100, 250, 500];

    defaultRecordsCountPerPage = 10;

    isResponsive = true;

    resizableColumns: false;

    totalRecordsCount = 0;

    records: any[];

    isLoading = false;

    showLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = true;
        }, 0);
    }

    hideLoadingIndicator(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 0);
    }

    getSorting(table: Table): string {
        let sorting;
        if (table.sortField) {
            sorting = table.sortField;
            if (table.sortOrder === 1) {
                sorting += ' ASC';
            } else if (table.sortOrder === -1) {
                sorting += ' DESC';
            }
        }

        return sorting;
    }

    getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.rows) {
            return paginator.rows;
        }

        if (!event) {
            return 0;
        }

        return event.rows;
    }

    getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.first) {
            return paginator.first;
        }

        if (!event) {
            return 0;
        }

        return event.first;
    }

    shouldResetPaging(event: LazyLoadEvent): boolean {
        if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
            return true;
        }

        return false;
    }

    adjustScroll(table: Table) {
        const rtl = rtlDetect.isRtlLang(abp.localization.currentLanguage.name);
        if (!rtl) {
            return;
        }

        const body: HTMLElement = table.el.nativeElement.querySelector('.ui-table-scrollable-body');
        const header: HTMLElement = table.el.nativeElement.querySelector('.ui-table-scrollable-header');
        body.addEventListener('scroll', () => {
          header.scrollLeft = body.scrollLeft;
        });
    }
}
