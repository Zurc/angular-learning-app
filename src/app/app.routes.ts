import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Signals } from './features/signals/signals';
import { Components } from './features/components/components';
import { Animations } from './features/animations/animations';
import { Forms } from './features/forms/forms';
import { Patterns } from './features/patterns/patterns';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signals', component: Signals },
  { path: 'components', component: Components },
  { path: 'animations', component: Animations },
  { path: 'forms', component: Forms },
  { path: 'patterns', component: Patterns },
  { path: '**', redirectTo: '' }
];
