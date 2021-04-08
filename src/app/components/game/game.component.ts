import {Component, OnInit} from '@angular/core';
import {Player} from '../../entities/player';
import {Task} from '../../entities/task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  tasks: Task[] = [];
  allPlayers: Player[] = [];
  currentTaskIndex: number;
  showResults = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.allPlayers = JSON.parse(localStorage.getItem('allPlayers'));
    this.taskService.getAllTasks().subscribe(t => {
      this.tasks = this.getRandomTasksOfArray(t, 10, this.allPlayers);
      console.log(this.tasks);
      this.currentTaskIndex = 0;
    });
  }

  nextTask(): void {
    if (this.currentTaskIndex === this.tasks.length - 1) {
      this.showResults = true;
      return;
    }
    this.currentTaskIndex++;
  }

  previousTask(): void {
    if (this.currentTaskIndex !== 0) {
      this.currentTaskIndex--;
    }
  }


  updateChoice(): void {
    console.log('update irgendwas');
  }


  public getRandomTasksOfArray(allTasks: Task[], amount: number, players: Player[]): Task[] {
    let tasksToReturn: Task[];
    tasksToReturn = this.getSplitArray(allTasks, amount, players);
    return tasksToReturn;
  }


  private getSplitArray(arr: Task[], amount: number, players: Player[]): Task[] {
    const tasksToRet: Task[] = [];
    const usedNumbers: number[] = [];

    for (let i = 0; i < amount; i++) {
      let n = this.randomInteger(0, arr.length - 1);
      let j = 0;

      while (usedNumbers.includes(n) && arr[n].players > players.length - 1) {
        j++;
        n = this.randomInteger(0, arr.length - 1);
      }

      if (arr[n].players > players.length - 1) {
        n = 0;
      } else {
        usedNumbers.push(n);
      }
      console.log(arr[n]);
      tasksToRet.push(this.addPlayersToTask(arr[n], players));
    }
    return tasksToRet;
  }

  private randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  private addPlayersToTask(t: Task, ps: Player[]): Task {
    const x = t.text;
    console.log(x);
    console.log(t.text);

    const newarr = x.split('xx');
    if (newarr.length > 1) {
      console.log(newarr);
      let toRet = '';
      const playerArr = this.getRandomPlayers(ps, t.players);
      console.log(playerArr);

      let playercount = 0;

      if (x.charAt(0) === 'x' && x.charAt(1) === 'x') {
        toRet = toRet.concat(playerArr[playercount++].name);
        // console.log(playerArr[playercount++].name);
      }

      let count = 0;

      while (count < newarr.length) {
        toRet = toRet.concat(newarr[count++]);
        if (playercount < playerArr.length) {
          toRet = toRet.concat(playerArr[playercount++].name);
        }
      }
      t.text = toRet;
    } else {
      t.text = x;
    }
    return t;
  }


  private getRandomPlayers(ps: Player[], amount: number): Player[] {
    const toRet: Player[] = [];
    const indexArr: number[] = [];
    let index = -1;
    let i = 0;

    while (i < amount) {
      index = this.randomInteger(0, ps.length - 1);
      if (!indexArr.includes(index)) {
        indexArr.push(index);
        toRet.push(ps[index]);
        i++;
      }
    }
    return toRet;
  }
}
