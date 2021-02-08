import { Publisher, Subjects, PaymentCreatedEvent } from '@epticket/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
