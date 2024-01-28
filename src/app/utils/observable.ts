export type Unsubscribe = () => void;

export class Observable<ListenerType> {
  private listeners: ((params: ListenerType) => void)[];

  constructor() {
    this.listeners = [];
  }

  public subscribe(listener: (params: ListenerType) => void): Unsubscribe {
    this.listeners.push(listener);
    return () => {
      this.unsubscribe(listener);
    };
  }

  public unsubscribe(listener: (params: ListenerType) => void): void {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  public notify(params: ListenerType): void {
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }

  public map<NewListenerType>(transform: (params: ListenerType) => NewListenerType): Observable<NewListenerType> {
    const newObservable = new Observable<NewListenerType>();
    this.subscribe((params) => newObservable.notify(transform(params)));
    return newObservable;
  }
}
