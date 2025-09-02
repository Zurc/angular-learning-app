import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrl: './child-component.scss'
})
export class ChildComponent {
  @Input() message: string = '';
  @Input() counter: number = 0;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() counterChange = new EventEmitter<number>();

  incrementCounter() {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  sendMessageToParent() {
    const message = `Child says hello at ${new Date().toLocaleTimeString()}`;
    this.messageEvent.emit(message);
  }
}
