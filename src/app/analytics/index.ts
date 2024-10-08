import { Crawlora } from "../main";

export class Analytics extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get() {
    const { data } = await this.api().get("/analytics");

    return data;
  }
}
