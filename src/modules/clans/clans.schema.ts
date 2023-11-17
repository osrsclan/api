import * as z from 'zod';

export const SearchForClanByGetSchema = z.object({
    name: z.string().min(1)
});
