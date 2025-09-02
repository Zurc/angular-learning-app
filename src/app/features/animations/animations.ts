import { Component } from '@angular/core';

interface Item {
  id: number;
  text: string;
}

@Component({
  selector: 'app-animations',
  imports: [],
  templateUrl: './animations.html',
  styleUrl: './animations.scss'
})
export class Animations {
  // Enter/Leave animations
  public showItem = false;
  public items: Item[] = [];
  private itemCounter = 0;
  
  // State transitions
  public isExpanded = false;
  public currentColor: 'blue' | 'red' | 'green' | 'purple' = 'blue';
  public isRotated = false;
  
  // List animations
  public listItems: Item[] = [];
  private listCounter = 0;
  
  // Keyframe animations
  public bounceState: 'idle' | 'bounce' = 'idle';
  public pulseState: 'idle' | 'pulse' = 'idle';
  public wobbleState: 'idle' | 'wobble' = 'idle';

  constructor() {
    // Initialize with some list items
    this.addListItem();
    this.addListItem();
    this.addListItem();
  }

  // Enter/Leave methods
  public toggleItem() {
    this.showItem = !this.showItem;
  }

  public addItem() {
    this.items.push({
      id: ++this.itemCounter,
      text: 'Item'
    });
  }

  public removeItem() {
    if (this.items.length > 0) {
      this.items.pop();
    }
  }

  // State transition methods
  public toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  public changeColor() {
    const colors: ('blue' | 'red' | 'green' | 'purple')[] = ['blue', 'red', 'green', 'purple'];
    const currentIndex = colors.indexOf(this.currentColor);
    this.currentColor = colors[(currentIndex + 1) % colors.length];
  }

  public toggleRotate() {
    this.isRotated = !this.isRotated;
  }

  // List animation methods
  public addListItem() {
    this.listItems.push({
      id: ++this.listCounter,
      text: `List Item ${this.listCounter}`
    });
  }

  public removeFirstItem() {
    if (this.listItems.length > 0) {
      this.listItems.shift();
    }
  }

  public removeListItem(id: number) {
    this.listItems = this.listItems.filter(item => item.id !== id);
  }

  public shuffleList() {
    this.listItems = [...this.listItems].sort(() => Math.random() - 0.5);
  }

  public clearList() {
    this.listItems = [];
  }

  // Keyframe animation methods
  public triggerBounce() {
    this.bounceState = this.bounceState === 'idle' ? 'bounce' : 'idle';
    setTimeout(() => this.bounceState = 'idle', 600);
  }

  public triggerPulse() {
    this.pulseState = this.pulseState === 'idle' ? 'pulse' : 'idle';
    setTimeout(() => this.pulseState = 'idle', 800);
  }

  public triggerWobble() {
    this.wobbleState = this.wobbleState === 'idle' ? 'wobble' : 'idle';
    setTimeout(() => this.wobbleState = 'idle', 600);
  }
}
