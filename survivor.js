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

var Contestant = function (name, startHealth) {
  this.name = name;
  this.health = startHealth;
}

Game.prototype.addContestant = function (name) {
  var newContestant = new Contestant (name, this.start);
  this.pool.push(newContestant);
}

Game.prototype.hit = function (name) {
  var target  = this.pool.find(contestant => { return contestant.name = name });
  target.health--;
  if (target.health <= 0) { this.kill(target.name); }
}

Game.prototype.heal = function (name) {
  var target  = this.pool.find(contestant => { return contestant.name = name });
  target.health++;
  if (target.health >= this.safety) { this.save(target.name); }
}
