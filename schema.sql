-- pg_dump --create --schema-only --dbname=preparationsForTheT3Stack --host=localhost --port=5432 --username=postgres --file=schema.sql

CREATE TYPE "Role" AS ENUM (
    'CUSTOMER',
    'SELLER',
    'ADMIN'
);

CREATE TABLE account (
    id text NOT NULL,
    user_id text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text
);

CREATE TABLE address (
    id text NOT NULL,
    country text NOT NULL,
    city text NOT NULL,
    postal_code text,
    street_address text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE brand (
    name text NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE brand_on_products (
    product_id text NOT NULL,
    brand_name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE categories_on_products (
    product_id text NOT NULL,
    category_name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE category (
    name text NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE customer (
    id text NOT NULL,
    first_mame text NOT NULL,
    second_mame text NOT NULL,
    bio text,
    sex text NOT NULL,
    date_of_birth timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE image (
    id text NOT NULL,
    src text NOT NULL,
    alt text
);

CREATE TABLE images_on_brand (
    image_id text NOT NULL,
    brand_name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE images_on_category (
    image_id text NOT NULL,
    category_name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE images_on_product (
    image_id text NOT NULL,
    product_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "order" (
    id text NOT NULL,
    items_price double precision NOT NULL,
    tax_price double precision NOT NULL,
    shipping_rice double precision NOT NULL,
    paid_at timestamp(3) without time zone,
    delivered_at timestamp(3) without time zone,
    payment_method text NOT NULL,
    shipping_address_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE payment_result (
    id text NOT NULL,
    status text NOT NULL,
    updated_at text NOT NULL,
    email text NOT NULL,
    order_id text NOT NULL
);

CREATE TABLE product (
    id text NOT NULL,
    title text NOT NULL,
    price double precision NOT NULL,
    description text NOT NULL,
    status text NOT NULL,
    count_in_stock integer NOT NULL,
    updated_at timestamp(3) without time zone,
    store_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE products_on_order (
    quantity integer NOT NULL,
    price_per_product double precision NOT NULL,
    product_id text NOT NULL,
    order_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE seller (
    id text NOT NULL,
    name text NOT NULL,
    bio text NOT NULL,
    stores_counter integer DEFAULT 0 NOT NULL,
    updated_at timestamp(3) without time zone,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE session (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);

CREATE TABLE store (
    id text NOT NULL,
    seller_id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    address_id text NOT NULL,
    image_id text,
    products_counter integer DEFAULT 0 NOT NULL,
    updated_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "user" (
    id text NOT NULL,
    role "Role",
    name text,
    email text,
    email_verified timestamp(3) without time zone,
    image text,
    updated_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE verification_token (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);
