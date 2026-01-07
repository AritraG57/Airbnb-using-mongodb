const db = require("../utils/databaseUtil");
const { getDb } = require("../utils/databaseUtil");
const { ObjectId } = require('mongodb');

class Home {
  constructor(image, homename, rating, price, _id, description) {
    this.homename = homename;
    this.price = price;
    this.image = image;
    this.rating = rating;
    if(this._id) {
      this._id = _id;
    }
    
    this.description = description;
  }

  save() {
    const db = getDb();
    if(this._id) {//update
      const updateFields = {
        homename :this.homename,
        price : this.price,
        rating : this.rating,
        photo : this.photo,
        description : this.description
      };
      db.collection("homes").updateOne({_id : new ObjectId(String(this._id))},{$set : updateFields});
    }
    else {//insert
      return db.collection("homes").insertOne(this);
    }
    
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db.collection('homes').findOne({ _id: new ObjectId(String(homeId)) });
  }

  static deleteById(homeId) {
    const db = getDb();
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) });
  }
}

module.exports = Home;
