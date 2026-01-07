import { z } from "zod";

// Phone number validation (Indian format)
const phoneRegex = /^[6-9]\d{9}$/;

// Step 1: Business Identity
export const businessIdentitySchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must be less than 100 characters")
    .trim(),
  ownerName: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must be less than 100 characters")
    .trim(),
  mobile: z
    .string()
    .regex(phoneRegex, "Please enter a valid 10-digit mobile number starting with 6-9"),
  whatsapp: z
    .string()
    .regex(phoneRegex, "Please enter a valid 10-digit WhatsApp number starting with 6-9")
    .optional()
    .or(z.literal("")),
  sameAsWhatsapp: z.boolean(),
}).refine(
  (data) => data.sameAsWhatsapp || (data.whatsapp && data.whatsapp.length === 10),
  {
    message: "WhatsApp number is required",
    path: ["whatsapp"],
  }
);

// Step 2: Location
export const locationSchema = z.object({
  state: z
    .string()
    .min(1, "Please select a state"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name must be less than 100 characters")
    .trim(),
});

// Step 3: Category
export const categorySchema = z.object({
  category: z
    .string()
    .min(1, "Please select a store category"),
});

// Step 4: Business Mode
export const businessModeSchema = z.object({
  businessMode: z
    .string()
    .min(1, "Please select a business mode"),
});

// Step 5: Plan
export const planSchema = z.object({
  plan: z
    .string()
    .min(1, "Please select a plan"),
});

// Complete form schema
export const joinFormSchema = z.object({
  storeName: z.string().min(2).max(100).trim(),
  ownerName: z.string().min(2).max(100).trim(),
  mobile: z.string().regex(phoneRegex),
  whatsapp: z.string().regex(phoneRegex).optional().or(z.literal("")),
  sameAsWhatsapp: z.boolean(),
  state: z.string().min(1),
  city: z.string().min(2).max(100).trim(),
  category: z.string().min(1),
  businessMode: z.string().min(1),
  plan: z.string().min(1),
});

export type JoinFormData = z.infer<typeof joinFormSchema>;

// Validation helper
export const validateStep = (step: number, data: Partial<JoinFormData>) => {
  try {
    switch (step) {
      case 1:
        businessIdentitySchema.parse(data);
        return { success: true, errors: {} };
      case 2:
        locationSchema.parse(data);
        return { success: true, errors: {} };
      case 3:
        categorySchema.parse(data);
        return { success: true, errors: {} };
      case 4:
        businessModeSchema.parse(data);
        return { success: true, errors: {} };
      case 5:
        planSchema.parse(data);
        return { success: true, errors: {} };
      default:
        return { success: false, errors: { _form: "Invalid step" } };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _form: "Validation failed" } };
  }
};
