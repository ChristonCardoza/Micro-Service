import { Subjects, Publisher, ExpirationCompleteEvent } from '@generalticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}