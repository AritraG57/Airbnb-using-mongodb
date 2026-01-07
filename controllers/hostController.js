//importing the modules
const favourite = require("../models/favourites");
const Home = require("../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "add-home",
    editing : false
  });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.image,
    req.body.homename,
    req.body.rating,
    req.body.price,
    null,
    req.body.description
  );

  home.save().then(()=> {
    res.render("host/home-added", {
    pageTitle: "Home Added",
    currentPage: "home-added",
    
  });
  }).catch((err)=> {
    console.log("Error Occured during postAddHome");
  });
  
};

exports.getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll().then((registeredHomes )=> {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes",
      currentPage: "host-homes",
    });
  }).catch((err)=> {
    console.log("Error occured during getHostHomes");
  });
};

exports.hostGetEditHomes = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home)=> {
    
  res.render("host/edit-home", {
    home : home,
    editing : editing,
    pageTitle: "Add Home",
    currentPage: "add-home",
  });
}
).catch((err)=> {
  console.log("Error occured during hostGetEditHomes");
})
  
  
};

exports.postEditHomes = (req,res,next) => {
  const home = new Home(
    req.body.image,
    req.body.homename,
    req.body.rating,
    req.body.price,
    req.body._id,
    req.body.description
  );
  home.save().then(()=> {
    res.redirect("/host/host-homes");
  }).catch((err)=> {
    console.log("Error Ocuured during postEditHomes");
  });
  
};

exports.postDeleteHome = (req,res,next)=> {
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(()=> {
    favourite.deleteFromFavourites(homeId).then(()=> {
      console.log("Home exists in favourites");
    }).catch((err)=> {
      console.log("Home does not exixt in favourites");
    })
    res.redirect('/host/host-homes');
  }).catch((err)=> {
    console.log("Error occured during postDeleteHome");
  });
  
}
