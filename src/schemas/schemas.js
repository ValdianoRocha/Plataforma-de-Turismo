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

//validar createplaceschema
export const createPlaceSchema = z.object({
    name: z.string().min(2).trim(),
    description: z.string().min(5).trim(),
    address: z.string().min(2).trim(),
    type: z.string().min(2).trim(),
    rating: z.number().positive(5).max(5)
})

//validar updateplaceschema
export const updatePlaceSchema = z.object({
    name: z.string().min(2).trim().optional(),
    description: z.string().min(5).trim().optional(),
    address: z.string().min(2).trim().optional(),
    type: z.string().min(2).trim().optional(),
    rating: z.number().positive(5).max(5).optional()
})