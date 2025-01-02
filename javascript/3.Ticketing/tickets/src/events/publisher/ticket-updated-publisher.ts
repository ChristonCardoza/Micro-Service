import { Publisher, Subjects, TicketUpdatedEvent} from "@generalticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}