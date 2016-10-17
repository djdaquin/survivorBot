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
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  var id = name.slice(0, 5).toUpperCase();
  var i = 0;
  // Check if 5 digit id is used, if so, replace last character with number until
  // it is unique.
  while(this.pool.find(contestant => {return contestant.id === id; })) {
    var id = id.slice(0, 4) + i;
    i++;
  }
  newContestant.id = i;
  this.pool.push(newContestant);
}

Game.prototype.hit = function (id) {
  id = id.toUpperCase();
  var target  = this.pool.find(contestant => { return contestant.id === id });
  if (!target) { return; }
  target.health--;
  if (target.health <= 0) { this.kill(target.id); }
}

Game.prototype.heal = function (id) {
  id = id.toUpperCase();
  var target  = this.pool.find(contestant => { return contestant.id === id });
  if (!target) { return; }
  target.health++;
  if (target.health >= this.safety) { this.save(target.id); }
}
