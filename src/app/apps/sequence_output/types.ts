import { z } from 'zod';


export const CreateSequenceOutput = z.object({
    sequence_id: z.string().uuid(),
    sequence_output: z.object({}).passthrough()
});

// You can export the inferred type as well
export type CreateSequenceOutputType = z.infer<typeof CreateSequenceOutput>;
