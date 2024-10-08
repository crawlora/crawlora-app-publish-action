import { Crawlora } from "../main";
import { RequestDto } from "./types";

export class Request extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(
    page: number = 1,
    recordPerPage: number = 10,
    order: string = "desc"
  ) {
    const { data } = await this.api().get(`/requests`, {
      params: {
        page,
        recordPerPage,
        order,
      },
    });
    return data;
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/requests/${id}`);
    return data;
  }

  async create(body: RequestDto) {
    const { data } = await this.api().post(`/requests`, body);
    return data;
  }

  async delete(id: string) {
    const { data } = await this.api().delete(`/requests/${id}`);
    return data;
  }
}
