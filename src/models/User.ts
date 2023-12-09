import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  // constructor
  constructor(attr: UserProps) {
    this.attributes = new Attributes<UserProps>(attr);
  }

  get get() {
    return this.attributes.get;
  }

  get getAll() {
    return this.attributes.getAll;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.triger;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.triger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") {
      throw new Error("cant get the user without any id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.attributes.set(response.data);
      this.events.triger("change");
    });
  }

  save(): void {
    const data = this.attributes.getAll();
    this.sync
      .save(data)
      .then((response: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}

export default User;
