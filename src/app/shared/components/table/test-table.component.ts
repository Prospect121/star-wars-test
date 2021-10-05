import {
  Component,
  Input,
  Directive,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { IPagination } from '../pagination/pagination.component';

@Directive({ selector: '[testTableBody]' })
export class TestTableBodyDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Component({
  selector: 'test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestTableComponent {

  @Input() headers!: string[];
  @Input() quantities: number[] = [10, 15, 20];
  @Input() data: any[] = [];
  @Input() pagination: IPagination = {
    first: 0,
    last: 0,
    total: 0
  };
  @Input() showPagination: boolean = true;

  @Output() goFirst: EventEmitter<void> = new EventEmitter();
  @Output() goPrevious: EventEmitter<void> = new EventEmitter();
  @Output() goNext: EventEmitter<void> = new EventEmitter();
  @Output() goLast: EventEmitter<void> = new EventEmitter();
  @Output() pageSize: EventEmitter<string> = new EventEmitter();

  @ContentChild(TestTableBodyDirective) bodyTable!: TestTableBodyDirective;

}
