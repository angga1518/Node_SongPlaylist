/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('song', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        genre: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'INTEGER',
            notNull: true,
        },
        duration: {
            type: 'INTEGER',
            notNull: false,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: false,
            references: '"album"',
            onDelete: 'cascade',
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('song');
};

