import axios, { AxiosPromise } from "axios";

const rootUrl = `http://localhost:3000/users`;

// using this to make sure that the object passed in Sync has an id property
interface hasId {
  id?: number;
}

export class Sync<T extends hasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    // Typeof id: number | undefined in strict mode
    // need to figure out how to fix this in strict mode: true
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
