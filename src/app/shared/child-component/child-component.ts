import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrl: './child-component.scss'
})
export class ChildComponent {
  message = input<string>('');
  counter = input<number>(0);
  messageEvent = output<string>();
  counterChange = output<number>();

  incrementCounter() {
    const newCounter = this.counter() + 1;
    this.counterChange.emit(newCounter);
  }

  sendMessageToParent() {
    const message = `Child says hello at ${new Date().toLocaleTimeString()}`;
    this.messageEvent.emit(message);
  }
}
