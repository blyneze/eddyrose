import { z } from 'zod'

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').trim(),
  summary: z.string().max(400, 'Summary is too long').trim().optional(),
  content: z.string().min(1, 'Content is required').max(10_000, 'Content exceeds 10,000 characters').trim(),
})

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').trim(),
  description: z.string().max(2000, 'Description is too long').trim().optional(),
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((d) => {
      const date = new Date(d)
      if (isNaN(date.getTime())) return false
      const year = date.getFullYear()
      return year >= 2020 && year <= 2100
    }, 'Date must be a valid year between 2020 and 2100'),
  time: z.string().max(20, 'Time is too long').trim().optional(),
  venue: z.string().max(200, 'Venue name is too long').trim().optional(),
})

export const idSchema = z.string().min(1, 'ID is required').max(36, 'ID is too long')
