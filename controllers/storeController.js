const favourite = require("../models/favourites");
const home = require("../models/Home");

exports.homeList = (req, res, next) => {
  home
    .fetchAll()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Index",
        currentPage: "index",
      });
    })
    .catch((err) => {
      console.log("Error occured during homeList");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  home
    .findById(homeId)
    .then((home) => {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "index",
      });
    })
    .catch((err) => {
      console.log("Error occured during getHomeDetails");
      res.redirect("/");
    });
};

exports.getAddToFavourites = (req, res, next) => {
  
  favourite
    .getFavourites()
    .then((favourites) => {
      favourites = favourites.map(fav => fav.houseId);
      
      home.fetchAll().then((registeredHomes)=> {
        const favouriteHomes = registeredHomes.filter((home)=> {
          return favourites.includes(home._id.toString());
        })
        
        res.render("store/favourites", {
          registeredHomes: favouriteHomes,
          pageTitle: "Favourites",
          currentPage: "favourites",
        });
      })
      
    })
    .catch(err => {
      console.log("Error occurred during getAddToFavourites", err);
    });
};


exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new favourite(homeId);
  fav.save().then((result)=> {
    // console.log("fav added: ",result);
  }).catch((err)=> {
    console.log("Error occured in postAddToFavourites",err);
  }).finally(()=> {
    res.redirect("/favourites");
  });
  
};

exports.postDeleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  favourite.deleteFromFavourites(homeId).then(()=> {
    res.redirect("/favourites");
  }).catch((err)=> {
    console.log("Error occured in postDeleteFavourites");
  })
};
