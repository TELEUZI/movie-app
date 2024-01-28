import { Observable } from './observable';

export function fromEvent<T extends Event = Event>(target: EventTarget, eventName: string): Observable<T> {
  const observable = new Observable<T>();

  const handler: EventListener = (event: Event) => {
    observable.notify(event as T);
  };

  target.addEventListener(eventName, handler);

  // Automatically remove the event listener when all subscribers have unsubscribed
  observable.subscribe(() => {
    if (observable['listeners'].length === 0) {
      target.removeEventListener(eventName, handler);
    }
  });

  return observable;
}
