/**
 * Interface Observable
 */
export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}

/**
 * Interface Observer
 */
export interface Observer {
  update(obs: Observable): void;
}
