import player1 from "/player1.svg";
import player2 from "/player2.svg";
import player3 from "/player3.svg";
import player4 from "/player4.svg";

const playersArray = [player1, player2, player3, player4];

export const randomIndex1 =
  Math.floor(Math.random() * 10) % playersArray.length;
export let randomIndex2 = Math.floor(Math.random() * 10) % playersArray.length;

while (randomIndex1 === randomIndex2) {
  randomIndex2 = Math.floor(Math.random() * 10) % playersArray.length;
}

export default playersArray;
