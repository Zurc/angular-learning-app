import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-host-demo',
  imports: [],
  templateUrl: './host-demo.html',
  styleUrl: './host-demo.scss',
  host: {
    '[class.highlighted]': 'isHighlighted',
    '[attr.data-theme]': 'theme',
    '[style.opacity]': 'opacity / 100'
  }
})
export class HostDemo {
  @Input() isHighlighted = false;
  @Input() theme = 'default';
  @Input() opacity = 100;
}
