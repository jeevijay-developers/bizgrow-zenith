# AI Product Detection Edge Function

This function uses Google's Gemini AI to detect products from images.

## Setup

### 1. Get Google AI API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key

### 2. Set Environment Variable in Supabase
```bash
# Using Supabase CLI
npx supabase secrets set GEMINI_API_KEY=your_api_key_here

# Or in Supabase Dashboard:
# Project Settings > Edge Functions > Add Secret
# Name: GEMINI_API_KEY
# Value: your_api_key_here
```

### 3. Deploy the Function
```bash
npx supabase functions deploy ai-product-detection
```

## How It Works

1. **SDK-based**: Uses official `@google/genai` SDK (more reliable than direct HTTP)
2. **Model Fallback**: Tries multiple models (`gemini-1.5-flash`, `gemini-1.5-flash-8b`, `gemini-1.5-pro`)
3. **Robust Parsing**: Handles various response formats and extracts JSON reliably
4. **Smart Category Matching**: Case-insensitive and partial category matching
5. **Price Normalization**: Handles different price formats (₹, $, commas)

## Response Format

```json
{
  "products": [
    {
      "name": "Product Name",
      "price": 99,
      "category": "Category",
      "description": "Description",
      "brand": "Brand",
      "confidence": 85,
      "originalImage": "data:image/jpeg;base64,...",
      "enhancedImage": null
    }
  ]
}
```

## Troubleshooting

### Check Logs
```bash
npx supabase functions logs ai-product-detection
```

### Common Issues

1. **"AI service not configured"** → GEMINI_API_KEY not set
2. **"Rate limit exceeded"** → Too many requests, wait and retry
3. **Low confidence scores** → Image quality is poor, retake with better lighting
4. **"Invalid Image Format"** → Ensure image is base64-encoded data URL

## Testing Locally

```bash
npx supabase functions serve ai-product-detection --env-file .env.local
```

Create `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```
