import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { StatsComponent } from './pages/stats/stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/new', component: TicketFormComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
  { path: 'tickets/:id/edit', component: TicketFormComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: 'tickets' },
];
