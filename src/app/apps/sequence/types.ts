import { z } from 'zod';


export const CreateSequence = z.object({
    app_id: z.string(),
    version: z.string(),
    input: z.any(), // Replace with a more specific type if needed
});

export const UpdateSequence = z.object({
    status: z.enum(['failed', 'in_progress', 'success']).optional(),
    version: z.string().optional(),
    input: z.any().optional(),
});


// You can export the inferred type as well
export type CreateSequenceType = z.infer<typeof CreateSequence>;
export type UpdateSequenceType = z.infer<typeof UpdateSequence>;
