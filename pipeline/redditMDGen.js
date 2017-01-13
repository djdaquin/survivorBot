const _ = require('underscore');

const redditFormattingGenerator = function (gameState) {
  let markdown = '';

  // Check if there is a winner or not.
    // If there is, display a message with a game summary.
    // If not, make the MD to show the gamestate.

  // Show the open to a gamestate text.
  markdown = markdown + require('../text/opOpen.js');
  // Create the alive player pool.
  markdown = markdown + '\n\n|ID|Name|HP|\n|--|----|--|';
  gameState.characters.alive.forEach(c => {
    markdown = markdown + '\n|' + c.visid + '|' + c.name + '|' + c.hp;
  });

  markdown = markdown + '\n\n### Haven: \n\n|ID|Name|\n|--|----|';
  gameState.characters.safe.forEach(c => {
    markdown = markdown + '\n|' + c.visid + '|' + c.name;
  });

  markdown = markdown + '\n\n### Graveyard:\n\n|ID|Name|Killed|Killer|\n|--|' +
    '----|------|------|';
  gameState.characters.dead.forEach(c => {
    markdown = markdown + '\n|' + c.visid + '|' + c.name + '|' + c.death + '|' +
      c.killer;
  });

  markdown = markdown + '\n\n### User Participation:\n\nUser\'s on Cooldown:\
    \n\n|Username|Time Left|\n|--------|---------|\n|Not Yet|Implemented';

  markdown = markdown + '\n\nUser Actions\n|Username|Actions|\n|--------|-------|';
  _.map(gameState.userHistory, (count, username) => ({username, count}))
    .sort((a, b) => b.count - a.count)
    .forEach((user) => {
      markdown = markdown + '\n|' + user.username + '|' + user.count;
    });

  console.log(markdown);
  return markdown;
};


module.exports = redditFormattingGenerator;
