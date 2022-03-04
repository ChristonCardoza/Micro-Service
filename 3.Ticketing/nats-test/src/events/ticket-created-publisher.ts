import { Publisher } from './base-publisher.ts|old';
import { TicketCreatedEvent } from './ticket-created-event.ts|old';
import { Subjects } from './subject.ts|Old';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}