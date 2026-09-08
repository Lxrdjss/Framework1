import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  private readonly ticketService = inject(TicketService);

  tickets: Ticket[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.ticketService.getAll().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: () => {
        this.error =
          "Impossible de charger les tickets. L'API est-elle lancee ?";
        this.loading = false;
      },
    });
  }
}
