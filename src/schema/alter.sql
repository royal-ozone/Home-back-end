-- ALTER TABLE product
-- RENAME COLUMN size TO size_and_color;

-- ALTER TABLE product
-- ALTER COLUMN size_and_color VARCHAR(10000);

-- ALTER TABLE product ADD COLUMN tempbar text;
-- UPDATE product SET tempbar = cast(cast(size_and_color as varchar) as text);
-- ALTER TABLE product DROP COLUMN size_and_color;
-- ALTER TABLE product ADD COLUMN size_and_color text;
-- UPDATE product SET size_and_color = tempbar;
-- ALTER TABLE product DROP COLUMN tempbar;

-- ALTER TABLE order_item
-- ADD color VARCHAR(50);
-- ALTER TABLE cart_item
-- ADD color VARCHAR(50);
-- ALTER TABLE address
-- ADD COLUMN store_address BOOLEAN;

-- ALTER TABLE store
-- ADD COLUMN mobile VARCHAR(15) NOT NULL unique;







