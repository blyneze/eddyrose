import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100).trim(),
  lastName: z.string().min(1, 'Last name is required').max(100).trim(),
  email: z.string().email('A valid email address is required').max(200).trim().toLowerCase(),
  phone: z.string().max(30).trim().optional(),
  inquiryType: z.string().min(1, 'Inquiry type is required').max(100).trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
