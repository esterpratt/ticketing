import { Publisher, Subjects, OrderCreatedEvent } from '@epticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
