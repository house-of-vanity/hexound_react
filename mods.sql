BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "mods" (
	"name"      TEXT,
	"mime"      TEXT,
	"date"      DATETIME DEFAULT CURRENT_TIMESTAMP,
    "author"	TEXT DEFAULT "Anonymous"
);
COMMIT;
