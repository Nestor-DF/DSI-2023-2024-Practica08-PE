import 'mocha';
import { expect } from 'chai';
import { Subscriber } from '../src/Subscriber.js';
import { NewsFeed } from '../src/FeedNoticias.js';

describe('NewsFeed', () => {
  let newsFeed: NewsFeed;
  let subscriber1: Subscriber;
  let subscriber2: Subscriber;

  beforeEach(() => {
    newsFeed = new NewsFeed();
    subscriber1 = new Subscriber(1, 'Pepe');
    subscriber2 = new Subscriber(2, 'Juana');
  });

  it('should subscribe and notify observers', () => {
    newsFeed.subscribe(subscriber1);
    newsFeed.subscribe(subscriber2);

    const content = 'Breaking news!';
    newsFeed.publishNews(content);

    expect(subscriber1.update(newsFeed)).to.equal(`I am Pepe and I received this new: ${content}`);
    expect(subscriber2.update(newsFeed)).to.equal(`I am Juana and I received this new: ${content}`);
  });

  it('should unsubscribe observers', () => {
    newsFeed.subscribe(subscriber1);
    newsFeed.subscribe(subscriber2);

    newsFeed.unsubscribe(subscriber1);

    const content = 'Another news!';
    newsFeed.publishNews(content);

    expect(subscriber1.update(newsFeed)).to.equal(`I am Pepe`);
    expect(subscriber2.update(newsFeed)).to.equal(`I am Juana and I received this new: ${content}`);
  });

  it('should handle duplicate subscriptions', () => {
    newsFeed.subscribe(subscriber1);

    expect(() => newsFeed.subscribe(subscriber1)).to.throw('The observer had already been subscribed');
  });

  it('should handle duplicate unsubscriptions', () => {
    expect(() => newsFeed.unsubscribe(subscriber1)).to.throw('The observer has not been subscribed');
  });
});
