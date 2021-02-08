import { Publisher, Subjects, TicketCreatedEvent } from '@epticket/common';

// Publisher needs the kind of event it will publish (TicketCreatedEvent)
// the subject is the name of the channel this publisher will emit the event to
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
