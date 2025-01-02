import { OrderCreatedEvent, OrderStatus } from '@generalticket/common';
import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/tickets';

const setup = async () => {
    // create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    // create and save a ticket
    const ticket =  Ticket.build({
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    });
    await ticket.save();

    // create a fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expiresAt: '14/05/1996',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, ticket };
}

it('sets the userId of the ticket', async () => {
    const { listener, data, msg, ticket } = await setup();

    // call the onMessge function with the data object + message object
    await listener.onMessage(data, msg);

    // write assertion to make sure ticket was created and updated!
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {  
    const { listener, data, msg, ticket } = await setup();

    // call the onMessge function with the data object + message object
    await listener.onMessage(data, msg);


    // write assertion to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});

it('publish a ticket updated event', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);

});