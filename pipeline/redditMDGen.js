
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

  console.log(markdown);
  return markdown;
};


module.exports = redditFormattingGenerator;
