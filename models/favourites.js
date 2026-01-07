const db = require('../utils/databaseUtil');
module.exports = class favourite {
  static addToFavourites = (homeId) => {
    return db.execute("INSERT INTO favourites (id) VALUES (?)",
        [homeId]);
  };

  static getFavourites = () => {
    return db.execute(`SELECT homes.*
    FROM homes
    INNER JOIN favourites
    ON homes.id = favourites.id`);
  };

  static deleteFromFavourites = (homeId) => {
    return db.execute("DELETE from favourites WHERE id = ?",[homeId]);
      
};

static getFavHomeWithDetails() {
  return db.execute(`SELECT homes.*
    FROM homes
    INNER JOIN favourites
    ON homes.id = favourites.id`);
}
}
