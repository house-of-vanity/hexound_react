BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "mods" (
	"secure_name"          TEXT,
	"real_name"     TEXT,
	"mime"          TEXT,
	"title"         TEXT,
	"sample"        TEXT,
	"message"       TEXT,
	"date"          DATETIME DEFAULT CURRENT_TIMESTAMP,
  "author"        TEXT DEFAULT "Anonymous",
  "hash"          TEXT
);
COMMIT;
