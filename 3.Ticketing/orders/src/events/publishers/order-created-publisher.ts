import { Publisher, OrderCreatedEvent, Subjects } from "@generalticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}