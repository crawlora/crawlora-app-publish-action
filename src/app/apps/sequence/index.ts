import { Crawlora } from "../../main";
import { CreateSequenceType, UpdateSequenceType } from "./types";
export class Sequence extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(page: number = 1, recordPerPage: number = 10, order: string = 'desc') {
    const { data } = await this.api().get(`/sequence`, {
      params: {
        page,
        recordPerPage,
        order
      }
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/sequence/${id}`);
    return data;
  }

  async create(body: CreateSequenceType) {
    const { data } = await this.api().post(`/sequence`, body)
    return data;
  }

  async update(id: string, body: UpdateSequenceType) {
    const { data } = await this.api().put(`/sequence/${id}`, body)
    return data
  }

  async delete(id: string) {
    const { data } = await this.api().delete(`/sequence/${id}`)
    return data
  }

}
