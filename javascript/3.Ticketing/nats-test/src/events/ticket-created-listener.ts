import { Message} from 'node-nats-streaming';

import { Listener } from './base-listener.ts|Old';
import { Subjects } from './subject.ts|Old';
import { TicketCreatedEvent } from './ticket-created-event.ts|old';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subjects: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data);

        msg.ack();
    }
}

export { TicketCreatedListener };