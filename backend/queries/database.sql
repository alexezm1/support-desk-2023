CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    isAdmin BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP,
)

CREATE TABLE IF NOT EXISTS tickets(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users,
    product VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL DEFAULT 'New',
    timestamp TIMESTAMP NOT NULL
)

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    timestamp TIMESTAMP NOT NULL
)

SELECT * FROM users AS u WHERE u.email = $1
INSERT INTO users (name, salt, password, email, timestamp) VALUES ($1, $2, $3, $4, $5)
INSERT INTO tickets (user_id, product_id, description, status, timestamp) VALUES ($1, $2, $3, $4, $5)
INSERT INTO products (name, price, timestamp) VALUES ('Iphone', 150.99, '2023-11-14T00:36:40.523Z')