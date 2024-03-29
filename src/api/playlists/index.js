const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { serviceP, servicePS, serviceS, validator }) => {
    const playlistsHandler = new PlaylistsHandler(serviceP, servicePS, serviceS, validator);
    server.route(routes(playlistsHandler));
  },
};
