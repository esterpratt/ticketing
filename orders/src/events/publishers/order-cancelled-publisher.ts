import { Publisher, Subjects, OrderCancelledEvent } from '@epticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
