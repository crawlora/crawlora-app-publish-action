import { z } from 'zod';
import { readFileSync } from 'fs';
import { working_dir } from '../inputs';
import { resolve } from 'path';


export const crawloraFileValidation = z.object({
  env: z.record(z.string(), z.string()),
  entrypoint: z.string().min(1, "Entrypoint cannot be empty"),
  function: z.string().min(1, "Function name cannot be empty"),
  screenshot_files: z.string().array().min(3, "There must be at least three screenshot file").transform(v => v.map(v => resolve(process.cwd(), v))),
  logo_file: z.string().min(1, "Logo file path cannot be empty").transform(v => resolve(process.cwd(), v)),
  banner_file: z.string().min(1, "Banner file path cannot be empty").transform(v => resolve(process.cwd(), v)),
  title: z.string().min(1, "Title cannot be empty"),
  short_description: z.string().min(1, "Short description cannot be empty"),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must follow semantic versioning (x.x.x)"),
  documentation_file: z.string().min(1, "Documentation file path cannot be empty").transform(v => resolve(process.cwd(), v)),
  input_file: z.string().min(1, "Input file path cannot be empty").transform(v => resolve(process.cwd(), v)),
  app_id: z.string().uuid().nullable().optional(),
  author: z.string().optional().nullable()
});

export const getValidatedFileInfo = (path: string) => {
  const filesStr = readFileSync(path, 'utf-8')
  const toJson = JSON.parse(filesStr)
  return crawloraFileValidation.parse(toJson)
}