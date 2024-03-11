import { Observer } from './interfaces.js';
import { Observable } from './interfaces.js';
import { NewsFeed } from './FeedNoticias.js';

/**
 * Represents a subscriber that implements the Observer interface.
 */
export class Subscriber implements Observer {
  constructor(
    private id: number,
    private name: string,
  ) {}

  /**
   * Gets the unique identifier of the subscriber.
   * @returns The subscriber's id.
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the name of the subscriber.
   * @returns The subscriber's name.
   */
  getName() {
    return this.name;
  }

  /**
   * Updates the subscriber with the latest news content from the observable.
   * @param observable - The observable object (an instance of NewsFeed).
   */
  update(observable: Observable): string {
    if (observable instanceof NewsFeed && observable.subscribers.includes(this)) {
      return `I am ${this.name} and I received this new: ${observable.getLatestNewsContent()}`;
    }
    return `I am ${this.name}`;
  }
}
