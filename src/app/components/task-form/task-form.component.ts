import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../entities/task';
import {FormControl, FormGroup} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() task: Task;
  @Output() onTaskCompleted = new EventEmitter<string>();

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      done: new FormControl()
    });
    console.log(this.task);

    this.form.valueChanges.subscribe(this.onChange);
  }

  onChange = () => {
    this.onTaskCompleted.emit(this.form.value.choice);
  };

}
