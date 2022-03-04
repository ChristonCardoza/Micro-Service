import { Publisher, Subjects, TicketCreatedEvent } from "@generalticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
