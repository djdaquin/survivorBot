

const redditFormattingGenerator = function (gameState) {
  let markdown = ''

  markdown = markdown + require('../text/opOpen.js');


  return markdown;
};

console.log(redditFormattingGenerator());

module.exports = redditFormattingGenerator;
