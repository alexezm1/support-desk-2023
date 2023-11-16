CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    isAdmin BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP NOT NULL
)

CREATE TABLE IF NOT EXISTS tickets(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users,
    product_id UUID REFERENCES products,
	description VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL
)

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    timestamp TIMESTAMP NOT NULL
)

SELECT * FROM users AS u WHERE u.email = $1
INSERT INTO users (name, salt, password, email, timestamp) VALUES ($1, $2, $3, $4, $5)