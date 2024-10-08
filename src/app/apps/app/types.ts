import { z } from 'zod';

export enum Input {
    input = 'input',
    checkbox = 'checkbox',
    radio = 'radio',
    select = 'select',
}

export const InputTypesSchema = z.object({
    type: z.nativeEnum(Input).default(Input.input),
    datatype: z.union([z.string(), z.number(), z.boolean(), z.array(z.any()), z.record(z.any())]),
    placeholder: z.string(),
    default: z.union([z.string(), z.number()]),
    label: z.string(),
    regex: z.string().regex(new RegExp('.*')),
    required: z.boolean(),
});


export const CreateApp = z.object({
    title: z.string(),
    description: z.string(),
    file_path: z.string(),
    icon: z.string(),
    banner: z.string(),
    author: z.string(),
    version: z.string(),
    input: z.array(InputTypesSchema),
    screenshots: z.string().array(),
    short_description: z.string()
});

export const UpdateApp = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    file_path: z.string().optional(),
    icon: z.string().optional(),
    banner: z.string().optional(),
    author: z.string().optional(),
    version: z.string().optional(),
    input: z.array(InputTypesSchema).optional(),
    screenshots: z.string().array().optional(),
    short_description: z.string().optional()
});


// You can export the inferred type as well
export type CreateAppType = z.infer<typeof CreateApp>;
export type UpdateAppType = z.infer<typeof UpdateApp>;
