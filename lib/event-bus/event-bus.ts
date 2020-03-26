import {Events} from "../constants/events";

export class EventBus {
  subscriptions = new Map();

  subscribe(eventName: Events, listener: (event?: CustomEvent) => any) {
    this.subscriptions.set(eventName, [...(this.subscriptions.get(eventName) || []), listener]);
  }

  unsubscribe(eventName: Events, listener?: (event?: CustomEvent) => any) {
    if (this.subscriptions.has(eventName)) {
      if (listener) {
        const listeners = this.subscriptions.get(eventName).filter(l => l !== listener);
        if (listeners.length === 0) {
          this.subscriptions.delete(eventName);
        } else {
          this.subscriptions.set(eventName, listeners);
        }
      } else {
        this.subscriptions.delete(eventName);
      }
    }
  }

  dispatch(eventName: Events, payload: any) {
    if (this.subscriptions.has(eventName)) {
      this.subscriptions.get(eventName).forEach(listener => listener(new CustomEvent(eventName, {detail: payload})));
    }
  }
}
