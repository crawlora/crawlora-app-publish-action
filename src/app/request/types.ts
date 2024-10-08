import { z } from "zod";

export enum Mode {
  WITH_JS = "with_js",
  WITHOUT_JS = "without_js",
}

export enum Protocol {
  HTTP = "http",
  HTTPS = "https",
}

export enum ResponseEnum {
  HTML = "html",
  PLUGIN = "plugin",
  ALL = "all",
}

const ProxySchema = z.object({
  port: z.number().int(),
  host: z.string(),
  protocol: z.nativeEnum(Protocol),
  username: z.string(),
  password: z.string(),
});

const RequestSchema = z.object({
  location: z.string().default("US"),
  language: z.string().default("en"),
  url: z.string().url(),
  plugin: z.string().uuid().optional(),
  state: z.string().optional(),
  responseType: z.nativeEnum(ResponseEnum).optional().default(ResponseEnum.ALL),
  mode: z.nativeEnum(Mode).optional().default(Mode.WITH_JS),
  callbackUrl: z.string().url().optional(),
  proxy: ProxySchema.optional(),
});

export type RequestDto = z.infer<typeof RequestSchema>;
