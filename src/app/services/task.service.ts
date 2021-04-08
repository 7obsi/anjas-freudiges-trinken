import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../entities/task';
import {map} from 'rxjs/operators';
import {Player} from '../entities/player';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  public getAllTasks(): Observable<Task[]> {
    return this.http.get('./assets/task-list.json').pipe(
      map((result: any[]) => {
        return result.map(r => new Task(r.text, r.players));
      })
    );
  }

}
