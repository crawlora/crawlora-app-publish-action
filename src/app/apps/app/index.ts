import FormData from "form-data";
import { Crawlora } from "../../main";
import { CreateAppType, UpdateAppType } from "./types";
import { createReadStream } from "fs";

export class Application extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(
    page: number = 1,
    recordPerPage: number = 10,
    order: string = "desc"
  ) {
    const { data } = await this.api().get(`/application`, {
      params: {
        page,
        recordPerPage,
        order,
      },
    });
    return data;
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/application/${id}`);
    return data;
  }

  async create(body: CreateAppType) {
    const form = new FormData();
    form.append("title", body.title);
    form.append("description", body.description);
    form.append("file", createReadStream(body.file_path));
    form.append("icon", createReadStream(body.icon));
    form.append("banner", createReadStream(body.banner));
    form.append("author", body.author);
    form.append("version", body.version);
    form.append("short_description", body.short_description)

    // Append each input item
    body.input.forEach((input) => {
      const info = JSON.stringify(input)
      form.append("input", info);
    });

    body.screenshots.forEach((inp) => {
      form.append("screenshots", createReadStream(inp));
    });

    const { data } = await this.api().post(`/application`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    return data;
  }

  async update(id: string, body: UpdateAppType) {
    const form = new FormData();
    form.append("title", body.title);
    form.append("description", body.description);
    form.append("short_description", body.short_description)
    if(body.file_path){
      form.append("file", createReadStream(body.file_path));
    }

    if(body.icon){
      form.append("icon", createReadStream(body.icon));
    }

    if(body.banner){
      form.append("banner", createReadStream(body.banner));
    }

    
    form.append("author", body.author);
    form.append("version", body.version);

    // Append each input item
    body?.input?.forEach((input) => {
      const info = JSON.stringify(input)
      form.append("input", info);
    });

    body?.screenshots?.forEach((inp) => {
      form.append("screenshots", createReadStream(inp));
    });

    const { data } = await this.api().put(`/application/${id}`, form, {
      headers: {
        ...form.getHeaders()
      }
    });
    return data;
  }

  async delete(id: string) {
    const { data } = await this.api().delete(`/application/${id}`);
    return data;
  }
}
