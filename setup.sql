CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  locomotive TEXT NOT NULL,
  filename TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
