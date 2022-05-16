const ClientError = require('../../exceptions/ClientError');

class PlaylistsHandler {
  constructor(serviceP, servicePS, serviceS, validator) {
    this._serviceP = serviceP;
    this._servicePS = servicePS;
    this._serviceS = serviceS;
    this._validator = validator;

    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postPlaylistsSongsHandler = this.postPlaylistsSongsHandler.bind(this);
    this.getPlaylistsSongsHandler = this.getPlaylistsSongsHandler.bind(this);
    this.deletePlaylistsSongsHandler = this.deletePlaylistsSongsHandler.bind(this);
  }

  async postPlaylistsHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._serviceP.addPlaylist(name, credentialId);

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._serviceP.getPlaylists(credentialId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._serviceP.verifyPlaylistAccess(id, credentialId);
      await this._serviceP.deletePlaylist(id);

      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async postPlaylistsSongsHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { songId } = request.payload;
      const { id } = request.params;

      // verif access
      const { id: credentialId } = request.auth.credentials;
      await this._serviceP.verifyPlaylistAccess(id, credentialId);

      // check song existance
      await this._serviceS.getSongById(songId)

      // add song to playlist
      const playlistSongId = await this._servicePS.addPlaylistSong(id, songId)

      const response = h.response({
        status: 'success',
        message: 'PlaylistSong berhasil ditambahkan',
        data: {
          playlistSongId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsSongsHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._serviceP.verifyPlaylistAccess(id, credentialId);
      const playlist = await this._serviceP.getPlaylistsByIdUsername(id)
      const songs = await this._servicePS.getPlaylistSongByPlaylistId(id)

      return {
        status: 'success',
        data: {
          playlist: {
            id: playlist[0].id,
            name: playlist[0].name,
            username: playlist[0].username,
            songs: songs
          },
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistsSongsHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { songId } = request.payload;
      const { id } = request.params;

      // verif access
      const { id: credentialId } = request.auth.credentials;
      await this._serviceP.verifyPlaylistAccess(id, credentialId);

      // delete song from playlist
      const playlistSongId = await this._servicePS.deletePlaylist(id, songId)

      const response = h.response({
        status: 'success',
        message: 'PlaylistSong berhasil dihapus',
        data: {
          playlistSongId,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

}

module.exports = PlaylistsHandler;
