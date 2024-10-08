import { Crawlora } from "../../main";
import { CreateSequenceOutputType } from "./types";

export class SequenceOutput extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/sequence-output/${id}`);
    return data;
  }

  async create(body: CreateSequenceOutputType) {
    const { data } = await this.api().post(`/sequence-output`, body)
    return data;
  }

}
