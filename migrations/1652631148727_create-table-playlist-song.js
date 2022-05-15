/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table playlist_song
  pgm.createTable('playlist_song', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom playlist_id dan song_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint('playlist_song', 'unique_playlist_id_and_song_id', 'UNIQUE(playlist_id, song_id)');

  // memberikan constraint foreign key pada kolom playlist_id dan song_id terhadap playlist.id dan song.id
  pgm.addConstraint('playlist_song', 'fk_playlist_song.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlist(id) ON DELETE CASCADE');
  pgm.addConstraint('playlist_song', 'fk_playlist_song.song_id_song.id', 'FOREIGN KEY(song_id) REFERENCES song(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus tabel playlist_song
  pgm.dropTable('playlist_song');
};
