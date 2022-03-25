import { OrderCancelledEvent } from '@generalticket/common';
import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/tickets';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();

    // create and save a ticket
    const ticket =  Ticket.build({
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    });
    ticket.set({ orderId });

    await ticket.save();

    // create a fake data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, ticket, orderId };
}

it('updates the ticket, publishes an event, and acks the message', async () => {

    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    const updatedticket = await Ticket.findById(ticket.id);

    expect(updatedticket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();

});