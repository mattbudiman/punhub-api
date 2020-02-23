CREATE TABLE puns (
	id BIGSERIAL,
	text TEXT NOT NULL,
	posted TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0),
	sentiment REAL NOT NULL CHECK (-5 <= sentiment AND sentiment <= 5)
);
