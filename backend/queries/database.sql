CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    date DATE NOT NULL,
    timestamp TIMESTAMP NOT NULL
)

SELECT * FROM users AS u WHERE u.email = $1
INSERT INTO users (name, password, email, timestamp, date) VALUES ($1, $2, $3, $4, $5)