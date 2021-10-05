import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  spanActive: boolean = false;
  @Output() onChange: EventEmitter<Boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChangeColor(){
    this.spanActive = this.spanActive?false:true;
    this.onChange.emit(this.spanActive);
  }
}
