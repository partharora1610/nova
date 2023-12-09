type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: () => void) => {
    const handlers = this.events[eventName] || [];

    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  triger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  };
}
