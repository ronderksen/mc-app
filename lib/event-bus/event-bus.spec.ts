import {EventBus} from './event-bus';
import {Events} from '../constants/events';

describe('Event Bus', () => {
  let eventBus = null;
  const testCard = {
    id: 'test1',
    title: 'test card'
  };

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('should allow subscribing to events', () => {
    const eventHandler = () => {
    };
    eventBus.subscribe(Events.cardDraw, eventHandler);

    expect(eventBus.subscriptions.size).toBe(1);
    expect(eventBus.subscriptions.get(Events.cardDraw)).toHaveLength(1);
    expect(eventBus.subscriptions.get(Events.cardDraw)[0]).toBe(eventHandler);
  });

  it('should allow unsubscribing a listener from events', () => {
    const eventHandler1 = () => {
    };
    const eventHandler2 = () => {
    };
    eventBus.subscribe(Events.cardDraw, eventHandler1);
    eventBus.subscribe(Events.cardDraw, eventHandler2);

    expect(eventBus.subscriptions.get(Events.cardDraw)).toHaveLength(2);
    eventBus.unsubscribe(Events.cardDraw, eventHandler1);
    expect(eventBus.subscriptions.get(Events.cardDraw)).toHaveLength(1);
  });

  it('should allow unsubscribing all listeners from events', () => {
    const eventHandler1 = () => {
    };
    const eventHandler2 = () => {
    };
    eventBus.subscribe(Events.cardDraw, eventHandler1);
    eventBus.subscribe(Events.cardDraw, eventHandler2);

    expect(eventBus.subscriptions.get(Events.cardDraw)).toHaveLength(2);
    eventBus.unsubscribe(Events.cardDraw);
    expect(eventBus.subscriptions.size).toBe(0);
  });

  it('should call all event handlers when an event is triggered', () => {
    const eventHandler1 = (event) => {
      expect(event.type).toBe(Events.cardDraw);
      expect(event.detail).toBe(testCard);
    };
    const eventHandler2 = (event) => {
      expect(event.type).toBe(Events.cardDraw);
      expect(event.detail).toBe(testCard);
    };
    eventBus.subscribe(Events.cardDraw, eventHandler1);
    eventBus.subscribe(Events.cardDraw, eventHandler2);

    eventBus.dispatch(Events.cardDraw, testCard);
  });

  it('should not call event handlers for different events', () => {
    const eventHandler1 = (event) => {
      expect(event.type).toBe(Events.cardDraw);
      expect(event.detail).toBe(testCard);
    };
    eventBus.subscribe(Events.cardDraw, eventHandler1);
    const eventHandler2 = (event) => {
      expect(event.type).toBe(Events.cardPlay);
    };
    eventBus.subscribe(Events.cardPlay, eventHandler2);

    eventBus.dispatch(Events.cardDraw, testCard);
  });
});
