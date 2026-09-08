import { Component, inject, OnInit } from '@angular/core';
import {
  TicketPriority,
  TicketStats,
  TicketStatus,
} from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  private readonly ticketService = inject(TicketService);

  stats: TicketStats | null = null;

  readonly statuses: TicketStatus[] = ['open', 'in_progress', 'closed'];
  readonly priorities: TicketPriority[] = ['low', 'medium', 'high'];

  ngOnInit(): void {
    this.ticketService.getStats().subscribe((stats) => (this.stats = stats));
  }
}
