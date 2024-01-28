import type { Unsubscribe } from './observable';

function isCallable(fn: unknown): fn is CallableFunction {
  return typeof fn === 'function';
}

export class Subject<ListenerType> {
  private value: ListenerType;

  private listeners: ((params: ListenerType) => void)[] = [];
  private onceListeners: ((params: ListenerType) => void)[] = [];

  constructor(initialValue: ListenerType) {
    this.value = initialValue;
  }

  public subscribe(
    listener: (params: ListenerType) => void,
    {
      once = false,
      skipFirst = true,
    }: {
      once?: boolean;
      skipFirst?: boolean;
    } = {},
  ): Unsubscribe {
    if (once) {
      this.onceListeners.push(listener);
      return () => {
        this.onceListeners = this.onceListeners.filter((elem) => elem !== listener);
      };
    }
    this.listeners.push(listener);
    if (skipFirst) {
      return () => {
        this.unsubscribe(listener);
      };
    }
    this.next(this.value);
    return () => {
      this.listeners = this.listeners.filter((elem) => elem !== listener);
    };
  }

  public unsubscribe(listener: (params: ListenerType) => void): void {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  public next(params: (previousValue: ListenerType) => ListenerType): void;
  public next(params: ListenerType): void;
  public next(params: ListenerType | (CallableFunction & ((previousValue: ListenerType) => ListenerType))): void {
    if (isCallable(params)) {
      this.value = params(this.value);
    } else {
      this.value = params;
    }

    this.listeners.forEach((listener) => {
      listener(this.value);
    });
    this.onceListeners.forEach((listener) => {
      listener(this.value);
    });
    this.onceListeners = [];
  }

  public getValue(): ListenerType {
    return this.value;
  }

  public map<NewListenerType>(mapFn: (params: ListenerType) => NewListenerType): Subject<NewListenerType> {
    const newSubject = new Subject(mapFn(this.value));
    this.subscribe((params) => {
      newSubject.next(mapFn(params));
    });
    return newSubject;
  }

  public filter(filterFn: (params: ListenerType) => boolean): Subject<ListenerType> {
    const newSubject = new Subject(this.value);
    this.subscribe((params) => {
      if (filterFn(params)) {
        newSubject.next(params);
      }
    });
    return newSubject;
  }

  public merge(mergeSubject: Subject<ListenerType>): Subject<ListenerType> {
    const newSubject = new Subject(this.value);
    this.subscribe((params) => {
      newSubject.next(params);
    });
    mergeSubject.subscribe((params) => {
      newSubject.next(params);
    });
    return newSubject;
  }

  switchMap<NewListenerType>(mapFn: (params: ListenerType) => Subject<NewListenerType>): Subject<NewListenerType> {
    const newSubject = new Subject(mapFn(this.value).getValue());
    this.subscribe((params) => {
      newSubject.next(mapFn(params).getValue());
    });
    return newSubject;
  }

  public complete(): void {
    this.listeners = [];
    this.onceListeners = [];
  }
}
