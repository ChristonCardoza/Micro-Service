import { PaymentCreatedEvent, Publisher, Subjects } from '@generalticket/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}