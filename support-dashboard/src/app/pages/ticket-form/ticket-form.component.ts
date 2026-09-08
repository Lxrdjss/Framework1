import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  TicketPayload,
  TicketPriority,
  TicketStatus,
} from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-form.component.html',
})
export class TicketFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ticketId: number | null = null;
  submitting = false;
  error = '';

  private createdAt = new Date().toISOString();

  readonly statuses: TicketStatus[] = ['open', 'in_progress', 'closed'];
  readonly priorities: TicketPriority[] = ['low', 'medium', 'high'];

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    status: ['open' as TicketStatus, Validators.required],
    priority: ['medium' as TicketPriority, Validators.required],
    assignee: ['', Validators.required],
  });

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === null) {
      return;
    }

    this.ticketId = Number(param);
    this.ticketService.getById(this.ticketId).subscribe({
      next: (ticket) => {
        this.createdAt = ticket.createdAt;
        this.form.patchValue({
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          assignee: ticket.assignee,
        });
      },
      error: () => (this.error = 'Ticket introuvable.'),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: TicketPayload = {
      ...this.form.getRawValue(),
      createdAt: this.createdAt,
    };

    this.submitting = true;
    const request$ =
      this.ticketId === null
        ? this.ticketService.create(payload)
        : this.ticketService.update(this.ticketId, payload);

    request$.subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: () => {
        this.error = "L'enregistrement a echoue.";
        this.submitting = false;
      },
    });
  }
}
