import { Subjects, Publisher, ExpirationCompleteEvent } from '@epticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
