import users from './users.json' assert { type: 'json' };
import chalk from 'chalk';

function main() {
  const people = users.map((user, index) => ({
    ...user,
    age: randomRangeNumber(18, 25),
    value: 1,
    isGay: index % 2 == 0 ? true : false
  }));

  const gays = people.filter((person) => person.isGay);

  console.log(`Comprobando si hay homosexuales...\n`);
  isThereGayPresence(people);

  const sortedGays = sortGays(gays);
  showGays(sortedGays);
  countGays(sortedGays);
}

function randomRangeNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isThereGayPresence(people) {
  const gayPresence = people.some((person) => person.isGay);
  if (gayPresence) {
    console.log(chalk.red('Hay presencia de homosexualidad\n'));
    console.log('Buscando maricones...\n');
  } else {
    console.log(chalk.green('No hay presencia de homosexualidad\n'));
  }
}

function sortGays(gays) {
  return gays.sort((first, second) => first.age - second.age);
}

function showGays(sortedGays) {
  return sortedGays.forEach((gay, index) => {
    console.log(`- ${gay.username} es el pajaro numero ${index + 1} con tan solo ${gay.age} años`);
  });
}

function countGays(gays) {
  const totalOfGays = gays.reduce((gayAmount, gay) => gayAmount + gay.value, 0);
  if (totalOfGays === 0) {
    console.log(`No se han encontrado homosexuales`);
  } else {
    console.log(`\n${totalOfGays} homosexuales encontrados`);
  }
}

main();