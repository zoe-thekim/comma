-- Migration script to rename items table to products table
-- This script helps migrate existing data from 'items' table to 'products' table

-- Step 1: Create new products table with updated column names (if not exists)
-- Note: This may be created automatically by Hibernate, but included for reference

-- Step 2: Migrate data from items table to products table (if items table exists)
-- Updated to handle new fields: color1, size, and renamed columns
INSERT INTO products (
    product_id,
    product_code,
    ref_id,
    name,
    description,
    color1,
    size,
    price,
    currency,
    url,
    img_url,
    category,
    sub_category,
    scraped_at,
    updated_at
)
SELECT
    item_no,                    -- product_id
    product_no,                 -- product_code
    ref_id,                     -- ref_id
    name,                       -- name
    description,                -- description
    NULL,                       -- color1 (new field, set to NULL for existing data)
    NULL,                       -- size (new field, set to NULL for existing data)
    price,                      -- price
    currency,                   -- currency
    url,                        -- url
    img_url,                    -- img_url
    category,                   -- category
    sub_category,               -- sub_category
    scraped_at,                 -- scraped_at
    updated_at                  -- updated_at
FROM items
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.product_id = items.item_no);

-- Step 3: Verify migration
-- SELECT COUNT(*) FROM items; -- Check original count
-- SELECT COUNT(*) FROM products; -- Check new count
-- SELECT * FROM products LIMIT 5; -- Check sample data

-- Step 4: Drop old items table (uncomment after verifying migration)
-- DROP TABLE IF EXISTS items;

-- Note:
-- 1. Run this script only after backing up your database
-- 2. Test on a development environment first
-- 3. Verify data migration before dropping the original table
-- 4. The new fields (color1, size) will be NULL for migrated data
--    You can update them later with proper values if needed