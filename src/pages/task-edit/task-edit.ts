import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Task } from '../tasks/tasks';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})
export class TaskEditPage {

  task: Task;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: HttpClient) {
    this.task = this.navParams.data.task;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.http.post('http://localhost:3000/api/Tasks', {
      "Name": this.task.name,
      "Description": this.task.description,
      "TaskStatus": "Created",
      "TaskCompletionDate": this.task.taskCompletionDate,
      "TaskEntryDate": new Date()
    }).subscribe((data) => {

    }, (err) => {});
    this.viewCtrl.dismiss();
  }

}
