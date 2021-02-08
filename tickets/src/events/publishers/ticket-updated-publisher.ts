import { Publisher, Subjects, TicketUpdatedEvent } from '@epticket/common';

// Publisher needs the kind of event it will publish (TicketUpdatedEvent)
// the subject is the name of the channel this publisher will emit the event to
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
