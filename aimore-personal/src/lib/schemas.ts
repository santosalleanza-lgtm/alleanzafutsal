import { z } from "zod";
import { equipmentOptions, experienceLevels, frequencies, goals, healthFlags, timeOptions } from "@/lib/assessment";

const keys = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

export const assessmentSchema = z.object({
  age: z.number().min(5).max(100),
  heightCm: z.number().min(90).max(230),
  weightKg: z.number().min(15).max(300),
  goal: z.enum(keys(goals)),
  frequency: z.enum(keys(frequencies)),
  activityType: z.string().max(80).optional(),
  time: z.enum(keys(timeOptions)),
  experience: z.enum(keys(experienceLevels)),
  equipment: z.array(z.enum(keys(equipmentOptions))).max(4),
  flags: z.array(z.enum(keys(healthFlags))).max(9),
  waistCm: z.number().min(30).max(250).nullable().optional(),
  hipCm: z.number().min(30).max(250).nullable().optional(),
  abdomenCm: z.number().min(30).max(250).nullable().optional(),
});

export const measurementSchema = z
  .object({
    measuredOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    weightKg: z.number().min(10).max(400).nullable(),
    waistCm: z.number().min(20).max(300).nullable(),
    hipCm: z.number().min(20).max(300).nullable(),
    abdomenCm: z.number().min(20).max(300).nullable(),
  })
  .refine((m) => m.weightKg !== null || m.waistCm !== null || m.hipCm !== null || m.abdomenCm !== null, { message: "Informe ao menos uma medida." });

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).regex(/^[\d\s()+-]*$/, "Telefone inválido."),
});
