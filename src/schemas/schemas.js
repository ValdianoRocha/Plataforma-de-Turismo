

import { z } from 'zod'

//validar user
export const createUserSchemas = z.object({
    name: z.string().min(2).trim(),
    email: z.string().email(),
    phone: z.string().min(10).max(13).trim(),
    password: z.string().min(6).trim()
})

//validar adm
export const createAdmSchemas = z.object({
    name: z.string().min(2).trim(),
    email: z.string().email(),
    password: z.string().min(6).trim()
})

//validar login
export const validateLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).trim()
})
