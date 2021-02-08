import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@epticket/common';
import { Ticket } from '../../models/Ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  // we will call ack() on the Message, to acknowledge the event was successfully processed,
  // and node-nats-streaming does not need to send it to another copy of the service
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price, id } = data;
    const ticket = Ticket.build({ title, price, id });
    await ticket.save();
    msg.ack();
  }
}
