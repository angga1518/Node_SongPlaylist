const mapDBToModel = ({
  id,
  title, 
  year, 
  genre, 
  performer, 
  duration, 
  album_id,
}) => ({
  id,
  title,
  year, 
  genre, 
  performer, 
  duration, 
  albumId: album_id,
});

const mapModelAllSongs = ({
  id,
  title, 
  performer, 
}) => ({
  id,
  title,
  performer, 
});

module.exports = { mapDBToModel, mapModelAllSongs};
