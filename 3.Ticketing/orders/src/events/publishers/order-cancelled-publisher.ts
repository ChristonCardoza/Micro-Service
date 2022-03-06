import { Publisher, OrderCancelledEvent, Subjects } from "@generalticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled= Subjects.OrderCancelled;
}