import { z } from 'zod';

export enum OrderEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum StatusEnum {
    DRAFT = 'draft',
    UNPUBLISH = 'unpublished',
    PUBLISHED = 'published',
}

export enum LanguageEnum {
    TYPESCRIPT = 'typescript',
    PYTHON = 'python',
    JAVA = 'java',
    PHP = 'php',
    GO = 'go',
    RUST = 'rust',
}

export const PaginationRequestDtoSchema = z.object({
    page: z.number().positive().int().optional().default(1),
    recordPerPage: z.number().positive().int().optional().default(10),
    order: z.nativeEnum(OrderEnum).optional().default(OrderEnum.DESC),
    key: z.string().optional(),
    value: z.string().optional(),
});

const FileSchema = z.object({
    originalname: z.string(),
    buffer: z.instanceof(Buffer),
    mimetype: z.string(),
    size: z.number(),
});

export const InputFilesSchema = z.object({
    file: z.array(FileSchema).optional(),
    test_data: z.array(FileSchema).optional(),
});

const PluginReqSchema = z.object({
    name: z.string().min(1, 'Name should not be empty'),
    status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.DRAFT),
    language: z.nativeEnum(LanguageEnum),
    comments: z.string().optional(),
    description: z.string().optional(),
    should_test: z
        .union([z.boolean(), z.string()])
        .transform((value) => value === 'true' || value === true)
        .optional()
        .default(false),
    allowed_hostnames: z
        .array(z.string())
        .optional()
        .transform((value) => (Array.isArray(value) ? value : [])),
    test_url: z.string().url(),
    with_js: z
        .union([z.boolean(), z.string()])
        .transform((value) => value !== 'false' && value !== false)
        .optional()
        .default(true),
});

const UpdatePluginReqSchema = z.object({
    name: z.string().optional(),
    status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.DRAFT),
    comments: z.string().optional(),
    should_test: z
        .union([z.boolean(), z.string()])
        .transform((value) => value === 'true' || value === true)
        .optional()
        .default(false),
    allowed_hostnames: z
        .array(z.string())
        .optional()
        .transform((value) => (Array.isArray(value) ? value : [])),
});


export type PluginReqDTO = z.infer<typeof PluginReqSchema>;
export type UpdatePluginReqDTO = z.infer<typeof UpdatePluginReqSchema>;
export type InputFiles = z.infer<typeof InputFilesSchema>;
export type PaginationRequestDto = z.infer<typeof PaginationRequestDtoSchema>;
