import users from "./users.json" with { type: "json" };
import chalk from "chalk";

interface User {
  username: string;
  age: number;
  isVampire: boolean;
  value: number;
}

function main(): void {
  const people: User[] = users.map((user) => ({
    ...user,
    age: randomRangeNumber(18, 65),
    value: 1,
    isVampire: randomRangeNumber(0, 1) === 1, // Asumimos que la condición de vampiro es aleatoria.
  }));

  const vampires = people.filter((person) => person.isVampire);

  console.log(`Comprobando si hay vampiros...\n`);
  isThereVampirePresence(people);

  const sortedVampires = sortVampires(vampires);
  showVampires(sortedVampires);
  countVampires(sortedVampires);
}

function randomRangeNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isThereVampirePresence(people: User[]): void {
  const vampirePresence: boolean = people.some((person) => person.isVampire);
  if (vampirePresence) {
    console.log(chalk.red("Hay vampiros presentes\n"));
    console.log("Buscando vampiros...\n");
  } else {
    console.log(chalk.green("No hay vampiros presentes\n"));
  }
}

function sortVampires(vampires: User[]): User[] {
  return vampires.sort((first, second) => first.age - second.age);
}

function showVampires(sortedVampires: User[]): void {
  sortedVampires.forEach((vampire, index) => {
    console.log(`- ${vampire.username} es el vampiro número ${index + 1} con ${vampire.age} años`);
  });
}

function countVampires(vampires: User[]): void {
  const totalOfVampires: number = vampires.reduce((vampireCount, vampire) => vampireCount + vampire.value, 0);
  if (totalOfVampires === 0) {
    console.log(`No se han encontrado vampiros`);
  } else {
    console.log(`\n${totalOfVampires} vampiros encontrados`);
  }
}

main();
