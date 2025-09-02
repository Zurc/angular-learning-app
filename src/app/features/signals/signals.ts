import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class Signals {
  protected readonly Math = Math;
  
  // Basic Signal
  count = signal(0);
  
  // Computed Signal Example
  width = signal(100);
  height = signal(50);
  area = computed(() => this.width() * this.height());
  
  // Effect Example
  logs = signal<string[]>([]);
  logCount = computed(() => this.logs().length);
  
  // LinkedSignal Example
  selectedTheme = signal('light' as 'light' | 'dark' | 'auto');
  systemPrefersDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);
  effectiveTheme = computed(() => {
    const selected = this.selectedTheme();
    if (selected === 'auto') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return selected;
  });

  constructor() {
    // Effect that runs when logCount changes
    effect(() => {
      console.log('Log count changed:', this.logCount());
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.systemPrefersDark.set(e.matches);
      });
  }

  incrementCount() {
    this.count.update(current => current + 1);
  }

  resetCount() {
    this.count.set(0);
  }

  updateWidth(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.width.set(value || 0);
  }

  updateHeight(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.height.set(value || 0);
  }

  addLogEntry() {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.update(current => 
      [...current, `Entry #${current.length + 1} at ${timestamp}`]
    );
  }

  clearLogs() {
    this.logs.set([]);
  }

  updateTheme(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedTheme.set(value as 'light' | 'dark' | 'auto');
  }
}
