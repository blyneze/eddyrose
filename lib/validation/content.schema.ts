import { z } from "zod"

/**
 * Validation schema for announcement creation.
 * Security: max-lengths prevent unbounded DB storage and UI injection (H1).
 */
export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long").trim(),
  summary: z.string().max(400, "Summary is too long").trim().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10_000, "Content exceeds 10,000 characters")
    .trim(),
})

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>

/**
 * Validation schema for event creation.
 * Security: date is constrained to a reasonable range; venue/title are capped (H1, M2).
 */
export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long").trim(),
  description: z.string().max(2000, "Description is too long").trim().optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((d) => {
      const date = new Date(d)
      if (isNaN(date.getTime())) return false
      const year = date.getFullYear()
      return year >= 2020 && year <= 2100
    }, "Date must be a valid year between 2020 and 2100"),
  time: z.string().max(20, "Time is too long").trim().optional(),
  venue: z.string().max(200, "Venue name is too long").trim().optional(),
})

export type CreateEventInput = z.infer<typeof createEventSchema>

/** ID format validator — reusable for any database record ID. */
export const idSchema = z.string().min(1, "ID is required").max(36, "ID is too long")
