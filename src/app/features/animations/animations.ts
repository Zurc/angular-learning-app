import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

interface Item {
  id: number;
  text: string;
}

@Component({
  selector: 'app-animations',
  imports: [],
  templateUrl: './animations.html',
  styleUrl: './animations.scss',
  animations: [
    // Enter/Leave animations
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),
    
    // State transitions
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '100px',
        width: '200px'
      })),
      state('expanded', style({
        height: '200px',
        width: '300px'
      })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out'))
    ]),
    trigger('colorChange', [
      state('blue', style({ 
        backgroundColor: '#3498db',
        borderColor: '#2980b9'
      })),
      state('red', style({ 
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b'
      })),
      state('green', style({ 
        backgroundColor: '#27ae60',
        borderColor: '#229954'
      })),
      state('purple', style({ 
        backgroundColor: '#9b59b6',
        borderColor: '#8e44ad'
      })),
      transition('* <=> *', animate('400ms ease'))
    ]),
    trigger('rotateState', [
      state('normal', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(45deg)' })),
      transition('normal <=> rotated', animate('300ms ease'))
    ]),
    
    // List animations
    trigger('listAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.95)'
        }),
        animate('200ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({
          opacity: 0,
          transform: 'translateY(-10px) scale(0.95)'
        }))
      ])
    ]),
    
    // Keyframe animations
    trigger('bounceAnimation', [
      state('idle', style({ transform: 'translateY(0)' })),
      state('bounce', style({ transform: 'translateY(0)' })),
      transition('idle => bounce', [
        animate('600ms', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-30px)', offset: 0.3 }),
          style({ transform: 'translateY(0)', offset: 0.5 }),
          style({ transform: 'translateY(-15px)', offset: 0.7 }),
          style({ transform: 'translateY(0)', offset: 1 })
        ]))
      ]),
      transition('bounce => idle', animate('0ms'))
    ]),
    trigger('pulseAnimation', [
      state('idle', style({ transform: 'scale(1)' })),
      state('pulse', style({ transform: 'scale(1)' })),
      transition('idle => pulse', [
        animate('800ms', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ]),
      transition('pulse => idle', animate('0ms'))
    ]),
    trigger('wobbleAnimation', [
      state('idle', style({ transform: 'rotate(0deg)' })),
      state('wobble', style({ transform: 'rotate(0deg)' })),
      transition('idle => wobble', [
        animate('600ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(-5deg)', offset: 0.25 }),
          style({ transform: 'rotate(5deg)', offset: 0.5 }),
          style({ transform: 'rotate(-3deg)', offset: 0.75 }),
          style({ transform: 'rotate(0deg)', offset: 1 })
        ]))
      ]),
      transition('wobble => idle', animate('0ms'))
    ])
  ]
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
