const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistsSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT s.id, s.title, s.performer from playlist_song ps inner join song s on ps.song_id = s.id where playlist_id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async addPlaylistSong(playlistId, songId) {
    const id = `playlist_song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_song VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('PlaylistSong gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async deletePlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_song WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist gagal dihapus');
    }
  }

}

module.exports = PlaylistsSongsService;
