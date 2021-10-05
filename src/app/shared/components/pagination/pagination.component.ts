import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface IPagination {
    first: number;
    last: number;
    total: number;
}

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: [`./pagination.component.scss`],
})
export class PaginationComponent {

    @Input() pagination: IPagination = {
        first: 0,
        last: 0,
        total: 0
    };

    @Input() quantities: number[] = [10, 15, 20];
    @Input() ofTranslation = 'de';

    @Output() goFirst: EventEmitter<void> = new EventEmitter();
    @Output() goPrevious: EventEmitter<void> = new EventEmitter();
    @Output() goNext: EventEmitter<void> = new EventEmitter();
    @Output() goLast: EventEmitter<void> = new EventEmitter();
    @Output() pageSize: EventEmitter<string> = new EventEmitter();
}
