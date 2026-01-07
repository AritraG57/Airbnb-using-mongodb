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
    .then(([favourites]) => {
      res.render("store/favourites", {
          registeredHomes: favourites,
          pageTitle: "Favourites",
          currentPage: "favourites",
        });
    })
    .catch(err => {
      console.log("Error occurred during getAddToFavourites", err);
    });
};


exports.postAddToFavourites = (req, res, next) => {
  //   console.log("Came to ", req.body);
  favourite.addToFavourites(req.body.id).then(()=> {
    res.redirect("/favourites");
  }).catch((err)=> {
    console.log("Error occured in postAddToFavourites",err);
  })
};

exports.postDeleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  favourite.deleteFromFavourites(homeId).then(()=> {
    res.redirect("/favourites");
  }).catch((err)=> {
    console.log("Error occured in postDeleteFavourites");
  })
};
