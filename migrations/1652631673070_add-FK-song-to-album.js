/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat album baru.
  pgm.sql("INSERT INTO album(id, name, year) VALUES ('old_song', 'old_song', 0001)");

  // mengubah nilai owner pada song yang owner-nya bernilai NULL
  pgm.sql("UPDATE song SET owner = 'old_song' WHERE owner = NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel album
  pgm.addConstraint('song', 'fk_song.owner_album.id', 'FOREIGN KEY(owner) REFERENCES album(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_song.owner_album.id pada tabel song
  pgm.dropConstraint('song', 'fk_song.owner_album.id');

  // mengubah nilai owner old_song pada song menjadi NULL
  pgm.sql("UPDATE song SET owner = NULL WHERE owner = 'old_song'");

  // menghapus album baru.
  pgm.sql("DELETE FROM album WHERE id = 'old_song'");
};
