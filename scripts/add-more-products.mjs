/**
 * Adds 5 more products to each of the 3 existing demo stores.
 * Run: node scripts/add-more-products.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(resolve(__dir, '../.env'), 'utf8')
const env = Object.fromEntries(
  envContent.split('\n').filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()] })
)

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Existing store IDs ────────────────────────────────────────────────────────
const STORES = {
  akhilesh: 'd8cb120a-367d-4378-b350-ef403c6fa233',   // Jain Kirana Store
  sumitro:  '315e2bf9-748c-4bc1-a5df-86ad12353016',   // Sumitro's Artisan Bakery
  vikas:    '0ba15644-8365-4cc5-8fd9-ce9575ddcc71',   // Patel Fresh Fruits
}

// ── Unsplash image URLs (all verified accessible) ─────────────────────────────
const NEW_PRODUCTS = {
  akhilesh: [
    {
      name:         'Amul Full Cream Milk 1L',
      description:  'Fresh, creamy full-fat milk from Amul — India\'s most trusted dairy brand. Pasteurised and homogenised for consistent quality. Rich in calcium, protein, and Vitamin D. Ideal for chai, coffee, desserts, or drinking plain. Refrigerate after opening.',
      price:        68,
      comparePrice: 75,
      category:     'Dairy & Eggs',
      stock:        50,
      imageUrl:     'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Parle-G Glucose Biscuits 800g',
      description:  "India's most beloved biscuit for over 80 years. Made with wheat, milk, and glucose for a wholesome energy boost. Mildly sweet with a classic melt-in-mouth texture. Perfect with chai, for kids' snacks, or dunking. Family value pack.",
      price:        42,
      comparePrice: 50,
      category:     'Biscuits & Snacks',
      stock:        150,
      imageUrl:     'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Maggi Masala Noodles (Pack of 12)',
      description:  'The iconic 2-minute noodles loved by millions. Each pack cooked with real vegetables and authentic Masala tastemaker. Ready in 2 minutes — a perfect quick meal or late-night snack. Pack of 12 × 70g.',
      price:        156,
      comparePrice: 180,
      category:     'Instant Food',
      stock:        80,
      imageUrl:     'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Dettol Original Hand Wash 250ml',
      description:  'Germ-protection hand wash trusted by doctors. Kills 99.9% of germs including bacteria and viruses. Gentle on skin with a refreshing pine fragrance. Pump dispenser for hygiene convenience. Dermatologically tested.',
      price:        99,
      comparePrice: 120,
      category:     'Health & Hygiene',
      stock:        60,
      imageUrl:     'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Brooke Bond Red Label Tea 500g',
      description:  'India\'s most popular chai brand — a bold, rich blend of Assam and Nilgiri tea leaves. Delivers the perfect cup with deep colour, strong aroma, and full-bodied flavour. Makes approximately 200+ cups. Freshness sealed.',
      price:        230,
      comparePrice: 265,
      category:     'Beverages',
      stock:        70,
      imageUrl:     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&auto=format',
    },
  ],

  sumitro: [
    {
      name:         'Cinnamon Rolls (Pack of 4)',
      description:  'Fluffy, pull-apart cinnamon rolls swirled with fragrant Ceylon cinnamon and brown sugar, topped with a generous drizzle of cream cheese frosting. Baked fresh every morning. Best served warm. Reheat in oven at 160°C for 5 minutes.',
      price:        180,
      comparePrice: 220,
      category:     'Pastries',
      stock:        20,
      imageUrl:     'https://images.unsplash.com/photo-1609427193428-b4b0f94e5ef8?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Cheesy Garlic Bread (2 Slices)',
      description:  'Toasted sourdough topped with roasted garlic butter, fresh parsley, and a generous blanket of melted mozzarella. Stone-baked for a crispy base and gooey top. A perfect side with pasta, soups, or as a standalone snack.',
      price:        85,
      comparePrice: 105,
      category:     'Savoury Bakes',
      stock:        25,
      imageUrl:     'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Almond Danish Pastry (Pack of 2)',
      description:  'Laminated pastry dough filled with smooth almond frangipane, topped with flaked almonds and a light icing glaze. Crisp caramelised layers outside, soft and moist inside. A classic Scandinavian-style bakery indulgence.',
      price:        150,
      comparePrice: 185,
      category:     'Pastries',
      stock:        15,
      imageUrl:     'https://images.unsplash.com/photo-1509983165097-0c31a863e3f3?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Banana Walnut Loaf Cake',
      description:  'Moist, dense loaf cake made with ripe Robusta bananas and crunchy California walnuts. Lightly spiced with cinnamon and vanilla. No refined sugar — sweetened naturally with bananas and jaggery. Serves 6–8. Stays fresh for 4 days.',
      price:        220,
      comparePrice: 260,
      category:     'Cakes',
      stock:        12,
      imageUrl:     'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Glazed Mini Doughnuts (Pack of 6)',
      description:  'Light, airy yeast-raised mini doughnuts coated in a classic sugar glaze. Each batch fried fresh and glazed while warm for a shiny, crackly finish. Soft, pillowy inside with a hint of vanilla. A crowd favourite for kids and adults alike.',
      price:        160,
      comparePrice: 190,
      category:     'Doughnuts',
      stock:        18,
      imageUrl:     'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop&auto=format',
    },
  ],

  vikas: [
    {
      name:         'Seedless Green Grapes (500g)',
      description:  'Crisp, sweet seedless green grapes sourced from premium Nashik vineyards. No seeds — easy to eat and great for snacking, fruit salads, or wine pairing platters. High in antioxidants and natural sugars. Washed and packed hygienically.',
      price:        110,
      comparePrice: 135,
      category:     'Grapes',
      stock:        40,
      imageUrl:     'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Fresh Papaya (Approx. 700g)',
      description:  'Sun-ripened papaya with vibrant orange flesh, soft texture, and naturally sweet flavour. Rich in digestive enzyme papain, Vitamin C, and beta-carotene. Great for breakfast, smoothies, or raw salads. Sold by the piece (approx. 700g).',
      price:        60,
      comparePrice: 80,
      category:     'Tropical Fruits',
      stock:        35,
      imageUrl:     'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Bhagwa Pomegranate (2 Pcs)',
      description:  "GI-tagged Bhagwa variety pomegranate from Solapur — India's finest. Deep ruby-red arils bursting with sweet-tangy juice. Exceptionally high in polyphenol antioxidants. Great for juicing or eating fresh. Thick rind ensures long shelf life.",
      price:        130,
      comparePrice: 160,
      category:     'Exotic Fruits',
      stock:        45,
      imageUrl:     'https://images.unsplash.com/photo-1541444943435-a6c7a058ce98?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Zespri Green Kiwi (Pack of 6)',
      description:  "New Zealand's premium Zespri Green kiwifruit — tangy-sweet flesh with a thin edible skin. Packed with Vitamin C (more than an orange!), dietary fibre, and potassium. Great for smoothies, fruit bowls, or snacking. Ripens at room temperature.",
      price:        190,
      comparePrice: 230,
      category:     'Exotic Fruits',
      stock:        30,
      imageUrl:     'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=600&h=600&fit=crop&auto=format',
    },
    {
      name:         'Sugar Baby Watermelon (Whole)',
      description:  "Small-to-medium 'Sugar Baby' watermelon variety — intensely sweet, deep-red flesh with minimal seeds. Crisp, hydrating, and perfect for summer. Rich in lycopene and Vitamin A. Weight approx. 2–3 kg. Whole fruit sold as-is.",
      price:        130,
      comparePrice: 160,
      category:     'Melons',
      stock:        25,
      imageUrl:     'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop&auto=format',
    },
  ],
}

// ── Image download & upload ───────────────────────────────────────────────────
async function uploadImage(storeId, slug, sourceUrl) {
  try {
    const res = await fetch(sourceUrl, { headers: { 'User-Agent': 'BizGrow360-Seeder/1.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const path = `${storeId}/${slug}-${Date.now()}.jpg`
    const { error } = await supabase.storage
      .from('product-images').upload(path, buffer, { contentType: 'image/jpeg', upsert: true })
    if (error) throw error
    return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl
  } catch (err) {
    console.warn(`    ⚠  Image upload failed, using source URL: ${err.message}`)
    return sourceUrl
  }
}

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════════')
console.log('  BizGrow360 — Add 5 More Products per Store')
console.log('═══════════════════════════════════════════════════════')

for (const [key, storeId] of Object.entries(STORES)) {
  const products = NEW_PRODUCTS[key]
  const storeNames = { akhilesh: 'Jain Kirana Store', sumitro: "Sumitro's Artisan Bakery", vikas: 'Patel Fresh Fruits' }
  console.log(`\n🏪  ${storeNames[key]} (${storeId})`)
  console.log(`  📦  Adding ${products.length} products...`)

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    process.stdout.write(`      [${i + 1}/${products.length}] ${p.name} — image... `)
    const imageUrl = await uploadImage(storeId, slugify(p.name), p.imageUrl)
    process.stdout.write('saving... ')
    const { error } = await supabase.from('products').insert({
      store_id:       storeId,
      name:           p.name,
      description:    p.description,
      price:          p.price,
      compare_price:  p.comparePrice,
      category:       p.category,
      image_url:      imageUrl,
      is_available:   true,
      stock_quantity: p.stock,
    })
    console.log(error ? `❌ ${error.message}` : '✅ done')
  }
}

console.log('\n═══════════════════════════════════════════════════════')
console.log('  Done! Each store now has 10 products.')
console.log('═══════════════════════════════════════════════════════\n')
