var Game = function (name, start, safety) {
  //name of the game
  this.name = name;
  //storage containers for the three game zones
  this.pool = [];
  this.haven = [];
  this.graveyard = [];
  //set starting health for the game
  this.start = start || 10;
  //health that Contestant must hit to make it to a haven.
  this.safety = safety || 30;
  //this counter will keep track of how many actions there have been.
  this.count = 0;
  // store how many actions each user has made.
  this.participation = {};
}

var Contestant = function (name, id, startHealth) {
  this.name = name;
  this.health = startHealth;
  this.id = id;
}
