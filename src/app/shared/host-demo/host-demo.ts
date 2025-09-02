import { Component, input } from '@angular/core';

@Component({
  selector: 'app-host-demo',
  imports: [],
  templateUrl: './host-demo.html',
  styleUrl: './host-demo.scss',
  host: {
    '[class.highlighted]': 'isHighlighted()',
    '[attr.data-theme]': 'theme()',
    '[style.opacity]': 'opacity() / 100'
  }
})
export class HostDemo {
  isHighlighted = input(false);
  theme = input('default');
  opacity = input(100);
}
