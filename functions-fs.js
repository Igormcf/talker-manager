const fs = require('fs').promises;

async function readTalker() {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = JSON.parse(talker);
  return result;
}

function writeTalker(param) {
  return fs.writeFile('./talker.json', JSON.stringify(param));
}

module.exports = { readTalker, writeTalker };