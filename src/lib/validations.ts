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

// Valid cities per state (used for validation)
const validStateCities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Anantapur", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Tezu", "Seppa", "Along", "Daporijo"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Karimganj"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Munger"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Dwarka", "Rohini", "Janakpuri", "Saket"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Pernem"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad"],
  "Haryana": ["Faridabad", "Gurgaon", "Rohtak", "Hisar", "Panipat", "Karnal", "Sonipat", "Yamunanagar", "Panchkula", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Dharamshala", "Kullu", "Hamirpur", "Bilaspur", "Chamba", "Una", "Palampur"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Dumka"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Davanagere", "Ballari", "Tumakuru", "Shivamogga", "Kalaburagi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kannur", "Kottayam", "Malappuram"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong", "Chandel", "Jiribam"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Williamnagar", "Nongpoh", "Mairang", "Resubelpara", "Ampati"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Hnahthial", "Khawzawl"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Ravangla", "Pelling", "Pakyong"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Khowai", "Ambassa", "Teliamura", "Sabroom", "Sonamura"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Almora", "Tehri"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"],
};

export { validStateCities };

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
}).refine(
  (data) => {
    if (!data.state || !data.city) return true;
    const cities = validStateCities[data.state];
    if (!cities) return true;
    return cities.some(c => c.toLowerCase() === data.city.toLowerCase());
  },
  {
    message: "Please select a valid city from the suggestions",
    path: ["city"],
  }
);

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
