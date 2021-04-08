import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Player} from '../../entities/player';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  startForm: FormGroup;
  test = '';

  ngOnInit(): void {
    this.test = 'hallo mein Name ist' +  '<h1>' + 'Tobias' + '</h1>' + ', und deiner?';

    /* Initiate the form structure */
    this.startForm = this.fb.group({
      namesOfPlayers: this.fb.array([this.fb.group({name: ''})])
    });
  }

  get nameList(): any {
    return this.startForm.get('namesOfPlayers') as FormArray;
  }

  addPlayer(): void {
    this.nameList.push(this.fb.group({name: ''}));
  }

  deletePlayer(index): void {
    this.nameList.removeAt(index);
  }

  startGame(): void {

    const allPlayers: Player[] = [];

    console.log(this.nameList.controls);
    this.nameList.controls.forEach(c => {
      const newPlayer: Player = new Player();
      newPlayer.name = c.value.name.toString();
      newPlayer.points = 0;
      allPlayers.push(newPlayer);
    });
    localStorage.setItem('allPlayers', JSON.stringify(allPlayers));

  }


  showPlayers(): void {
    console.log(JSON.parse(localStorage.getItem('allPlayers')));
  }
}
