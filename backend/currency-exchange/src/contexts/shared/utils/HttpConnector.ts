import axios from 'axios';

export class HttpConnector {
  async get<T>(url: string, headers: { [key: string]: string }) {
    const { data }: { data: T } = await axios.get(url, { headers });
    return data;
  }
}
