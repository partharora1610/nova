type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: () => void) => {
    const handlers = this.events[eventName] || [];

    if (handlers) {
      handlers.push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  };

  triger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  };
}
