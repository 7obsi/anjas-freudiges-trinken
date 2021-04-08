export class Task {
  text: string;
  players: number;

  constructor(public cText: string, cPlayers: number) {
    this.text = cText;
    this.players = cPlayers;
  }
}
