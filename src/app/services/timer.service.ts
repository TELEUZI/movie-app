import { Observable } from '@utils/observable';

export class TimerService extends Observable<number> {
  private intervalId?: number;

  constructor(private timerInterval: number) {
    if (timerInterval <= 0) {
      throw new Error('Timer interval should be greater than 0ms');
    }
    super();
    this.start();
  }

  public start(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = window.setInterval(() => {
      this.notifyAll(Date.now());
    }, this.timerInterval);
  }

  public pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public stop(): void {
    this.pause();
    this.unsubscribeAll();
  }
}
