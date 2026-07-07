import { Injectable, signal } from '@angular/core';

/**
 * Service to notify the user when the server is starting up.
 */

@Injectable({
  providedIn: 'root'
})
export class ColdStartNotifierService {

  visible = signal(false);

  message = signal('');

  private timer?: ReturnType<typeof setTimeout>;

  start() {
    this.clearTimer();

    // If the server takes more than 3 seconds to start, a message is shown to the user.
    this.timer = setTimeout(() => {
      this.visible.set(true);
      this.message.set(
        'Le serveur se réveille, cela peut prendre quelques instants...'
      );
    }, 3000);
  }

  stop() {
    this.clearTimer();

    this.visible.set(false);
    this.message.set('');
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
}