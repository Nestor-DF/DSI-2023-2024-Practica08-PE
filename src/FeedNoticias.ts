import { Observable, Observer } from './interfaces.js';

/**
 * Class to manage the news feed.
 */
export class NewsFeed implements Observable {
  public subscribers: Observer[] = [];

  private News: string[] = [];

  /**
   * Gets the last new
   * @returns The new
   */
  getLatestNewsContent(): string {
    return this.News[this.News.length - 1];
  }

  /**
   * Method to manage subscribers (add).
   * @param observer
   */
  subscribe(observer: Observer) {
    if (this.subscribers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.subscribers.push(observer);
    }
  }

  /**
   * Method to manage subscribers (remove).
   * @param observer
   */
  unsubscribe(observer: Observer) {
    const index = this.subscribers.indexOf(observer);
    if (index === -1) {
      throw new Error('The observer has not been subscribed');
    } else {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Notify all subscribers
   */
  notify() {
    this.subscribers.forEach((observer) => observer.update(this));
  }

  /**
   * Publishes a new news article.
   * @param type - The type of news (enum NewsType).
   * @param content - The content of the news article.
   */
  public publishNews(content: string) {
    this.News.push(content);
    this.notify();
  }
}
