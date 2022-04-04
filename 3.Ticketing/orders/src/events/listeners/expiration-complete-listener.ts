import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from '@generalticket/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { queueGroupName } from './queue-group-name';
import { natsWrapper } from '../../nats-wrapper';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket');

        console.log('OrderCancel Event: ', data)

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.Cancelled,
        });
        await order.save();

        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        msg.ack();
    }
}