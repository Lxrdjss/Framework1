import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Ticket,
  TicketPayload,
  TicketPriority,
  TicketStats,
  TicketStatus,
} from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/tickets';

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl);
  }

  getById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/${id}`);
  }

  create(payload: TicketPayload): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseUrl, payload);
  }

  update(id: number, payload: TicketPayload): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStats(): Observable<TicketStats> {
    return this.getAll().pipe(map((tickets) => this.buildStats(tickets)));
  }

  private buildStats(tickets: Ticket[]): TicketStats {
    const byStatus: Record<TicketStatus, number> = {
      open: 0,
      in_progress: 0,
      closed: 0,
    };
    const byPriority: Record<TicketPriority, number> = {
      low: 0,
      medium: 0,
      high: 0,
    };

    for (const ticket of tickets) {
      byStatus[ticket.status]++;
      byPriority[ticket.priority]++;
    }

    return { total: tickets.length, byStatus, byPriority };
  }
}
