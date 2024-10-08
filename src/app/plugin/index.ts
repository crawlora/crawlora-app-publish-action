import { InputFiles, PaginationRequestDto, PluginReqDTO, UpdatePluginReqDTO } from './types';
import { Crawlora } from "../main";
import FormData from 'form-data'
import { createReadStream, ReadStream } from 'fs';

export class Plugin extends Crawlora {
  constructor(apiKey?: string, baseUrl?: URL) {
    super(apiKey, baseUrl);
  }

  async get(dto: PaginationRequestDto) {
    const { data } = await this.api().get(`/plugins`, {
      params: dto
    });
    return data;
  }

  async getById(id: string) {
    const { data } = await this.api().get(`/plugins/${id}`);
    return data;
  }

  async create(pluginData: PluginReqDTO, testFilePath?: string | ReadStream, codeFilePath?: string | ReadStream) {
    const formData = new FormData();

    Object.keys(pluginData).forEach((key) => {
      //@ts-ignore
      let value = pluginData[key];

      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      formData.append(key, value);
    });

    if (testFilePath && typeof testFilePath === 'string') {
      formData.append('test_data', createReadStream(testFilePath))
    }

    if (codeFilePath && typeof codeFilePath === 'string') {
      formData.append('file', createReadStream(codeFilePath))
    }

    if (testFilePath && testFilePath instanceof ReadStream) {
      formData.append('test_data', testFilePath)
    }

    if (codeFilePath && codeFilePath instanceof ReadStream) {
      formData.append('file', codeFilePath)
    }

    const { data } = await this.api().post(`/plugins`, formData, {
      headers: {
        ...formData.getHeaders()
      },
    })
    return data;
  }

  async update(id: string, pluginData: UpdatePluginReqDTO, testFilePath: string | ReadStream, codeFilePath: string | ReadStream) {
    const formData = new FormData();

    Object.keys(pluginData).forEach((key) => {
      //@ts-ignore
      let value = pluginData[key];
  
      // Convert non-string values (like boolean) to strings
      if (typeof value !== 'string') {
        value = JSON.stringify(value); // Convert to string representation
      }
      
      formData.append(key, value);

    });

    if (testFilePath && typeof testFilePath === 'string') {
      formData.append('test_data', createReadStream(testFilePath))
    }

    if (codeFilePath && typeof codeFilePath === 'string') {
      formData.append('file', createReadStream(codeFilePath))
    }

    if (testFilePath && testFilePath instanceof ReadStream) {
      formData.append('test_data', testFilePath)
    }

    if (codeFilePath && codeFilePath instanceof ReadStream) {
      formData.append('file', codeFilePath)
    }    


    const { data } = await this.api().put(`/plugins/${id}`, formData, {
      headers: {
        ...formData.getHeaders()
      },
    })

    return data
  }

  async delete(id: string) {
    const { data } = await this.api().delete(`/plugins/${id}`)
    return data
  }

}
