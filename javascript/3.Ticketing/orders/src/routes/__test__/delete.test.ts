import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../model/ticket';
import { Order, OrderStatus } from '../../model/order';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('marks an order as cancelled', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        id: new mongoose.Types.ObjectId().toHexString()
    });
    await ticket.save();

    const user = global.signin();

    // make a request to build an order with this ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id})
        .expect(201);

    // make request to fetch the order
    const { body: fetchedOrder } = await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit a order cancelled event', async () => {

    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        id: new mongoose.Types.ObjectId().toHexString()
    });

    await ticket.save();
    const user = global.signin();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id})
        .expect(201);

    const { body: fetchedOrder } = await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
} );



