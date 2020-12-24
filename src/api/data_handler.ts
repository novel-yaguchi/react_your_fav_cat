import axios from "axios";
import { AxiosRequestConfig, AxiosError, ResponseType } from "axios";

declare const Buffer : any;

type Data = null | undefined | string;

export default class DataHandler {
  private readonly MAX_RETRIAL: number = 1;

  private readonly path: string;
  private index: number;
  private retryCount: number;
  private retryMethod: (payload?: object) => Promise<Data>;
  private data?: Data;

  constructor(path: string) {
    this.path = path;

    this.index = 0;
    this.retryCount = 0;
    this.retryMethod = this.get;

    this.data = undefined;

    this.handleError = this.handleError.bind(this);
  }

  private prepareConfig(type: ResponseType): AxiosRequestConfig {
    const decacher = +new Date() + this.index++ + "";

    return {
      responseType: type,
      params: {
        decacher
      },
      headers: {}
    };
  }

  async get(): Promise<Data> {
    this.retryMethod = this.get;

    const config = this.prepareConfig("arraybuffer");

    const res = await axios
      .get(this.path, config)
      .catch(
        async (e: AxiosError) => await this.handleError(e).catch(() => "")
      );

    if (res) this.data = res.data;

    return this.data;
  }

  async getAsBase64(): Promise<Data> {
    this.retryMethod = this.getAsBase64;

    const config = this.prepareConfig("arraybuffer");

    const res = await axios
      .get(this.path, config)
      .catch(
        async (e: AxiosError) => await this.handleError(e).catch(() => "")
      );

    if (res) this.data = Buffer.from(res.data, "binary").toString("base64");

    return this.data;
  }

  async post(payload: object): Promise<Data> {
    this.retryMethod = this.post.bind(this, payload);

    const config = this.prepareConfig("arraybuffer");

    const res = await axios
      .post(this.path, payload, config)
      .catch(async (e: AxiosError) => await this.handleError(e));

    if (res) this.data = res.data;

    // basically, data schema depends on the received data.
    // thus, a changing data schema should be careful.
    return this.data;
  }

  async handleError(e: AxiosError): Promise<any> {
    if (!e.response) return Promise.reject(e);

    switch (e.response.status) {
      case 404:
        console.log("Cat for given keyword is not found.");

        return Promise.reject(e);

      case 401:
      case 402:
      case 403:
      case 500:
      default:
        if (this.retryCount > this.MAX_RETRIAL) return Promise.reject(e);

        this.retryCount++;

        await this.retryMethod()
          .then(d => Promise.resolve(d))
          .catch(e => Promise.reject(e));
    }
  }
}
