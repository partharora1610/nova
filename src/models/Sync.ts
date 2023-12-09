import axios, { AxiosPromise } from "axios";

const rootUrl = `http://localhost:3000/users`;

interface hasId {
  id?: number;
}

export class Sync<T extends hasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
