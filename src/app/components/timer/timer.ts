import { BaseComponent } from '@components/base-component';
import { TextSkeleton } from '@components/text-skeleton';
import { TimerService } from '@services/timer.service';
import { formatTime } from '@utils/format-time';

import styles from './timer.module.scss';

const TIMER_INTERVAL = 1000;

class TimerComponent extends BaseComponent {
  private readonly timerService = new TimerService(TIMER_INTERVAL);

  constructor(private premiereDate: number) {
    super({ className: styles.timer }, TextSkeleton());
    this.timerService.subscribe(this);
  }

  public update(currentTime: number): void {
    if (this.premiereDate <= currentTime) {
      this.setTextContent('The premiere has started');
      this.timerService.stop();
    } else {
      const timeResult = formatTime(this.premiereDate - currentTime);
      this.setTextContent(timeResult);
    }
  }

  public override destroy(): void {
    this.timerService.stop();
    super.destroy();
  }
}

export const Timer = (premiereDate: number) => new TimerComponent(premiereDate);
