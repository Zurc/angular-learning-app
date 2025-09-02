import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChildComponent } from '../../shared/child-component/child-component';
import { CardComponent } from '../../shared/card-component/card-component';
import { HostDemo } from '../../shared/host-demo/host-demo';

@Component({
  selector: 'app-components',
  imports: [ChildComponent, CardComponent, HostDemo],
  templateUrl: './components.html',
  styleUrl: './components.scss'
})
export class Components {
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  
  inputValue = '';
  childMessage = '';
  childCounter = 0;
  messagesFromChild: string[] = [];
  showProjectionContent = true;
  isHighlighted = false;
  currentTheme = 'default';
  opacity = 100;

  focusInput() {
    this.textInput.nativeElement.focus();
  }

  clearInput() {
    this.textInput.nativeElement.value = '';
    this.inputValue = '';
  }

  getInputValue() {
    this.inputValue = this.textInput.nativeElement.value;
  }

  sendMessageToChild() {
    this.childMessage = `Hello at ${new Date().toLocaleTimeString()}`;
  }

  resetChildCounter() {
    this.childCounter = 0;
  }

  onChildMessage(message: string) {
    this.messagesFromChild.push(message);
  }

  onChildCounterChange(counter: number) {
    this.childCounter = counter;
  }

  toggleProjectionContent() {
    this.showProjectionContent = !this.showProjectionContent;
  }

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  changeTheme() {
    const themes = ['default', 'primary', 'secondary', 'accent'];
    const currentIndex = themes.indexOf(this.currentTheme);
    this.currentTheme = themes[(currentIndex + 1) % themes.length];
  }

  updateOpacity(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.opacity = value;
  }
}
