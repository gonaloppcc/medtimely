export const randomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const randomChoice = <T>(choices: T[]): T =>
    choices[randomNumber(0, choices.length - 1)];
