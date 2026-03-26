/**
 * BizGrow360 — Demo Account Seeder
 * ─────────────────────────────────────────────────────────────────────────────
 * Creates 3 demo accounts with stores and 5 products each.
 * Accounts: Akhilesh Jain, Sumitro, Vikas Patel
 *
 * SETUP:
 *   1. Add SUPABASE_SERVICE_ROLE_KEY to your .env file
 *      (Supabase Dashboard → Project Settings → API → service_role key)
 *   2. Run:  node scripts/seed-demo-accounts.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── Load .env manually (no dotenv dependency needed) ────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dir, '../.env')
const envContent = readFileSync(envPath, 'utf8')
const envVars = Object.fromEntries(
  envContent
    .split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...rest] = line.split('=')
      return [key.trim(), rest.join('=').trim()]
    })
)

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || 'https://zyaawadtgdvawkdmnkcz.supabase.co'
const SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE_ROLE_KEY) {
  console.error('\n❌  SUPABASE_SERVICE_ROLE_KEY is missing.')
  console.error('    Add it to your .env file:')
  console.error('    SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>')
  console.error('    (Supabase Dashboard → Project Settings → API → service_role)\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─── Unsplash image URLs ──────────────────────────────────────────────────────
const IMG = {
  // Kirana store products
  rice:        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop&auto=format',
  flour:       'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop&auto=format',
  dal:         'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=600&fit=crop&auto=format',
  oil:         'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop&auto=format',
  spices:      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&h=600&fit=crop&auto=format',
  // Bakery products
  bread:       'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop&auto=format',
  cake:        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop&auto=format',
  croissant:   'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop&auto=format',
  muffins:     'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=600&fit=crop&auto=format',
  cookies:     'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop&auto=format',
  // Fruits store products
  mango:       'https://images.unsplash.com/photo-1605027990121-cbae9e0642b5?w=600&h=600&fit=crop&auto=format',
  strawberry:  'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop&auto=format',
  apple:       'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop&auto=format',
  orange:      'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=600&fit=crop&auto=format',
  mango2:      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop&auto=format',
}

// ─── Demo accounts data ───────────────────────────────────────────────────────
const DEMO_USERS = [
  {
    // ── Account 1: Akhilesh Jain — Kirana Store ──────────────────────────────
    name:     'Akhilesh Jain',
    email:    'akhilesh.demo@bizgrow.in',
    password: 'Demo@12345',
    phone:    '9876543210',
    store: {
      name:     'Jain Kirana Store',
      category: 'kirana',
      state:    'Maharashtra',
      city:     'Mumbai',
      address:  'Shop No. 4, Andheri West Market, Mumbai - 400053',
    },
    products: [
      {
        name:         'India Gate Basmati Rice 5kg',
        description:  'Premium long-grain basmati rice aged for 2 years. Each grain cooks to perfection with a delicate aroma — the ideal choice for biryani, pulao, and everyday meals. 100% natural, no additives.',
        price:        450,
        comparePrice: 520,
        category:     'Grains & Cereals',
        stock:        100,
        imageUrl:     IMG.rice,
      },
      {
        name:         'Aashirvaad Whole Wheat Atta 5kg',
        description:  'Chakki-ground whole wheat flour made from hand-picked Sharbati wheat. Rich in dietary fibre and nutrients. Makes soft, fluffy rotis every time. No maida, no additives.',
        price:        265,
        comparePrice: 310,
        category:     'Flour & Grains',
        stock:        80,
        imageUrl:     IMG.flour,
      },
      {
        name:         'Tata Sampann Toor Dal 1kg',
        description:  'Premium quality unpolished toor dal (pigeon peas) retaining its natural oils and nutrients. High in protein and fibre. Cooks quickly with a rich, earthy flavour. Perfect for everyday dal.',
        price:        185,
        comparePrice: 220,
        category:     'Pulses & Lentils',
        stock:        120,
        imageUrl:     IMG.dal,
      },
      {
        name:         'Fortune Sunflower Refined Oil 1L',
        description:  'Light and healthy sunflower oil enriched with natural Vitamin E. Low in saturated fats with a high smoking point, ideal for deep frying, sautéing, and everyday cooking. 100% refined, no cholesterol.',
        price:        155,
        comparePrice: 185,
        category:     'Cooking Oil',
        stock:        60,
        imageUrl:     IMG.oil,
      },
      {
        name:         'MDH Chaat Masala 100g',
        description:  'Authentic blend of premium spices including dried mango, cumin, and black salt. Adds a tangy, bold flavour to chaats, salads, fruit bowls, and snacks. The secret ingredient to street-style taste at home.',
        price:        55,
        comparePrice: 65,
        category:     'Spices & Masalas',
        stock:        200,
        imageUrl:     IMG.spices,
      },
    ],
  },

  {
    // ── Account 2: Sumitro — Artisan Bakery ───────────────────────────────────
    name:     'Sumitro',
    email:    'sumitro.demo@bizgrow.in',
    password: 'Demo@12345',
    phone:    '9765432100',
    store: {
      name:     "Sumitro's Artisan Bakery",
      category: 'bakery',
      state:    'West Bengal',
      city:     'Kolkata',
      address:  '12A, Park Street, Kolkata - 700016',
    },
    products: [
      {
        name:         'Fresh White Sandwich Bread',
        description:  'Soft, pillowy white sandwich bread baked fresh every morning. Made with premium flour, real butter, and no artificial preservatives. Stays fresh for 3 days. Perfect for toasts, sandwiches, and French toast.',
        price:        48,
        comparePrice: 60,
        category:     'Breads',
        stock:        30,
        imageUrl:     IMG.bread,
      },
      {
        name:         'Dark Chocolate Truffle Cake (500g)',
        description:  'Indulgent layer cake made with 70% Belgian dark chocolate ganache, moist cocoa sponge, and a silky truffle centre. Handcrafted with real cream and no synthetic colours. Serves 4–6. Customisation available on request.',
        price:        450,
        comparePrice: 550,
        category:     'Cakes',
        stock:        10,
        imageUrl:     IMG.cake,
      },
      {
        name:         'Butter Croissants (Pack of 4)',
        description:  'Classic French-style croissants with dozens of flaky, golden layers. Made with 83% European-style butter, slow-fermented dough, and baked fresh daily. Slightly crisp outside, cloud-soft inside. Best enjoyed warm.',
        price:        130,
        comparePrice: 160,
        category:     'Pastries',
        stock:        25,
        imageUrl:     IMG.croissant,
      },
      {
        name:         'Blueberry Muffins (Pack of 6)',
        description:  'Generous bakery-style muffins bursting with fresh blueberries in every bite. Made with whole milk, real eggs, and a hint of lemon zest. Moist, fluffy, and perfectly sweet — great for breakfast or an on-the-go snack.',
        price:        240,
        comparePrice: 285,
        category:     'Muffins & Cupcakes',
        stock:        20,
        imageUrl:     IMG.muffins,
      },
      {
        name:         'Chocolate Chip Cookies (250g)',
        description:  'Chunky bakery cookies packed with premium semi-sweet Belgian chocolate chips and a sprinkle of sea salt. Baked daily in small batches for a fresh, homemade taste. Perfectly crisp edges with a chewy centre. Great with chai or coffee.',
        price:        120,
        comparePrice: 145,
        category:     'Cookies & Biscuits',
        stock:        50,
        imageUrl:     IMG.cookies,
      },
    ],
  },

  {
    // ── Account 3: Vikas Patel — Fresh Fruits ─────────────────────────────────
    name:     'Vikas Patel',
    email:    'vikas.demo@bizgrow.in',
    password: 'Demo@12345',
    phone:    '9654321008',
    store: {
      name:     'Patel Fresh Fruits',
      category: 'fruits',
      state:    'Gujarat',
      city:     'Ahmedabad',
      address:  'Stall 7, APMC Fruit Market, Jamalpur, Ahmedabad - 380022',
    },
    products: [
      {
        name:         'Ratnagiri Alphonso Mangoes (1 Dozen)',
        description:  'The undisputed king of mangoes — GI-tagged Alphonso from Ratnagiri, Maharashtra. Exceptionally sweet with a rich saffron-coloured pulp and irresistible aroma. Handpicked at peak ripeness. Seasonal availability (March–June). Sold by the dozen.',
        price:        480,
        comparePrice: 580,
        category:     'Tropical Fruits',
        stock:        40,
        imageUrl:     IMG.mango,
      },
      {
        name:         'Fresh Strawberries (500g)',
        description:  'Plump, sweet-tart strawberries sourced from Mahabaleshwar farms. Naturally red and juicy, rich in Vitamin C and antioxidants. Great for smoothies, desserts, or simply eating fresh. Refrigerate upon delivery.',
        price:        140,
        comparePrice: 170,
        category:     'Berries',
        stock:        30,
        imageUrl:     IMG.strawberry,
      },
      {
        name:         'Washington Red Apples (1kg)',
        description:  'Crisp, sweet, and beautifully red Washington State apples imported for premium quality. High in dietary fibre and Vitamin C. Perfect for snacking, salads, and baking. Approximately 4–5 apples per kg.',
        price:        220,
        comparePrice: 265,
        category:     'Apples',
        stock:        80,
        imageUrl:     IMG.apple,
      },
      {
        name:         'Nagpur Sweet Oranges (1kg)',
        description:  "The world-famous Nagpur orange — India's GI-tagged citrus pride. Exceptionally juicy, thin-skinned, and packed with natural sweetness. High Vitamin C content. Ideal for juicing or eating fresh. No artificial ripening agents.",
        price:        90,
        comparePrice: 115,
        category:     'Citrus Fruits',
        stock:        100,
        imageUrl:     IMG.orange,
      },
      {
        name:         'Gir Kesar Mangoes (1kg)',
        description:  "Saurashtra's beloved Kesar variety — named for its vivid saffron-orange flesh and intoxicating floral aroma. Buttery smooth texture with balanced sweetness. GI-certified from Junagadh, Gujarat. Best enjoyed chilled. Seasonal (April–July).",
        price:        200,
        comparePrice: 250,
        category:     'Tropical Fruits',
        stock:        60,
        imageUrl:     IMG.mango2,
      },
    ],
  },
]

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Download an image from a URL and return it as a Buffer.
 * Follows redirects (Node 18+ fetch does this natively).
 */
async function downloadImage(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'BizGrow360-Seeder/1.0' },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} downloading ${url}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/**
 * Download an image and upload it to Supabase Storage.
 * Returns the public URL of the uploaded image.
 * Falls back to the original URL on failure.
 */
async function uploadProductImage(storeId, slug, sourceUrl) {
  try {
    const buffer = await downloadImage(sourceUrl)
    const path = `${storeId}/${slug}-${Date.now()}.jpg`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, buffer, { contentType: 'image/jpeg', upsert: true })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(path)

    return publicUrl
  } catch (err) {
    console.warn(`    ⚠  Image upload failed (using source URL instead): ${err.message}`)
    return sourceUrl
  }
}

/** Slugify a product name for use as a storage filename */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Delete a demo user by email if it already exists (clean re-run support) */
async function deleteExistingUser(email) {
  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  if (error) return
  const existing = users.find(u => u.email === email)
  if (existing) {
    console.log(`  ♻  Found existing account for ${email} — deleting for clean re-seed...`)
    await supabase.auth.admin.deleteUser(existing.id)
  }
}

// ─── Main seeding logic ───────────────────────────────────────────────────────

async function seedUser(userData) {
  console.log(`\n👤  Creating account: ${userData.name} <${userData.email}>`)

  // Clean up any previous run
  await deleteExistingUser(userData.email)

  // 1. Create auth user (email_confirm: true skips email verification)
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
    user_metadata: {
      full_name: userData.name,
      phone:     userData.phone,
      whatsapp:  userData.phone,
    },
  })
  if (authError) throw new Error(`Auth user creation failed: ${authError.message}`)

  const userId = authData.user.id
  console.log(`  ✅  Auth user created: ${userId}`)

  // Wait briefly for the trigger to create the profile row
  await new Promise(r => setTimeout(r, 500))

  // 2. Verify profile was auto-created by trigger (update if needed)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (!profile) {
    // Trigger may not have fired — insert manually
    await supabase.from('profiles').insert({
      user_id:   userId,
      full_name: userData.name,
      phone:     userData.phone,
      whatsapp:  userData.phone,
    })
    console.log('  ✅  Profile created manually (trigger not fired)')
  } else {
    console.log('  ✅  Profile auto-created by trigger')
  }

  // 3. Create store
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  const { data: store, error: storeError } = await supabase
    .from('stores')
    .insert({
      user_id:             userId,
      name:                userData.store.name,
      category:            userData.store.category,
      business_mode:       'shop-delivery',
      state:               userData.store.state,
      city:                userData.store.city,
      address:             userData.store.address,
      is_active:           true,
      subscription_status: 'trial',
      trial_ends_at:       trialEndsAt,
    })
    .select()
    .single()

  if (storeError) throw new Error(`Store creation failed: ${storeError.message}`)
  console.log(`  ✅  Store created: "${store.name}" (ID: ${store.id})`)

  // 4. Create products with uploaded images
  console.log(`  📦  Creating ${userData.products.length} products...`)

  for (let i = 0; i < userData.products.length; i++) {
    const p = userData.products[i]
    process.stdout.write(`      [${i + 1}/${userData.products.length}] ${p.name} — downloading image... `)

    const imageUrl = await uploadProductImage(store.id, slugify(p.name), p.imageUrl)
    process.stdout.write('uploading... ')

    const { error: productError } = await supabase.from('products').insert({
      store_id:      store.id,
      name:          p.name,
      description:   p.description,
      price:         p.price,
      compare_price: p.comparePrice,
      category:      p.category,
      image_url:     imageUrl,
      is_available:  true,
      stock_quantity: p.stock,
    })

    if (productError) {
      console.log(`❌ FAILED: ${productError.message}`)
    } else {
      console.log('✅ done')
    }
  }

  return {
    name:    userData.name,
    email:   userData.email,
    password: userData.password,
    userId,
    storeId: store.id,
    storeName: store.name,
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════')
  console.log('  BizGrow360 — Demo Account Seeder')
  console.log(`  Supabase: ${SUPABASE_URL}`)
  console.log('═══════════════════════════════════════════════════════')

  const results = []

  for (const user of DEMO_USERS) {
    try {
      const result = await seedUser(user)
      results.push(result)
    } catch (err) {
      console.error(`\n❌  Failed for ${user.name}: ${err.message}`)
    }
  }

  console.log('\n═══════════════════════════════════════════════════════')
  console.log('  SEEDING COMPLETE — Summary')
  console.log('═══════════════════════════════════════════════════════')
  for (const r of results) {
    console.log(`\n  👤 ${r.name}`)
    console.log(`     Email:    ${r.email}`)
    console.log(`     Password: ${r.password}`)
    console.log(`     Store:    ${r.storeName}`)
    console.log(`     User ID:  ${r.userId}`)
    console.log(`     Store ID: ${r.storeId}`)
  }
  console.log('\n  Login at: https://bizgrow.in/auth')
  console.log('═══════════════════════════════════════════════════════\n')
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err)
  process.exit(1)
})
