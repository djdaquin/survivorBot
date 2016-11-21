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
};

var Contestant = function (name, startHealth) {
  this.name = name;
  this.health = startHealth;
};

Game.prototype.addContestant = function (name) {
  var newContestant = new Contestant (name, this.start);
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  var id = name.slice(0, 5).toUpperCase();
  var i = 0;
  // Check if 5 digit id is used, if so, replace last character with number until
  // it is unique.
  while(this.pool.find(contestant => {return contestant.id === id; })) {
    id = id.slice(0, 4) + i;
    i++;
  }
  newContestant.id = id;
  this.pool.push(newContestant);
};

Game.prototype.hurt = function (id) {
  id = id.toUpperCase();
  var target  = this.pool.find(contestant => contestant.id === id );
  if (!target) { return; }
  this.count++;
  target.health--;
  if (target.health <= 0) { this.kill(target.id); }
  // TODO
};

Game.prototype.heal = function (id) {
  id = id.toUpperCase();
  var target  = this.pool.find(contestant => contestant.id === id);
  if (!target) { return; }
  // this.count++; This would be a double count as a hurt and heal happen
  // at the same time.
  target.health++;
  if (target.health >= this.safety) { this.save(target.id); }
};

Game.prototype.kill = function (id) {
  // Find right contestant
  let targetIndex = this.pool.findIndex(contestant => contestant.id === id);
  if (targetIndex === undefined) {
    console.error('that character wasn\'t there...and that should not happen');
    return;
  }
  // if you are here, id has been found
  // store death time (this.count)
  this.pool[targetIndex].deathTime = this.count;
  // remove from the pool and put into the graveyard.
  this.graveyard.push(this.pool.splice(targetIndex, 1));
  this.checkStatus();
};

Game.prototype.save = function (id) {
  // Find right contestant
  let targetIndex = this.pool.findIndex(contestant => contestant.id === id);
  if (targetIndex === undefined) {
    console.error('that character wasn\'t there...and that should not happen');
    return;
  }
  // move contestant with this id from pool to haven.
  this.haven.push(this.pool.splice(targetIndex, 1));
  this.checkStatus();
};

Game.prototype.checkStatus = function () {
  // check if the pool only has one contestant in it.
  // if so, move those in haven into pool and set all scores to min
  // do so by making new contestants.
};
