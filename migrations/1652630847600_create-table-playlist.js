/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table playlist
  pgm.createTable('playlist', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('playlist', 'fk_playlist.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus tabel playlist
  pgm.dropTable('playlist');
};
