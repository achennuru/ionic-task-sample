import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';

export class Task {
  id: number;
  name: string;
  description: string;
  taskStatus: string;
  taskEntryDate: Date;
  taskCompletionDate: Date;

  constructor(id: number, name: string, description: string, taskStatus: string, taskEntryDate: Date, taskCompletionDate: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.taskCompletionDate = taskCompletionDate;
    this.taskEntryDate = taskEntryDate;
    this.taskStatus = taskStatus;
  }
}

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  tasks: Task[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.initialize();
  }

  initialize() {
    this.tasks = [];
    this.http.get('http://localhost:3000/api/Tasks').subscribe((data) => {
      if(Array.isArray(data)) {
        var count = data.length;
        for(var i=0;i<count;i++) {
          var task = data[i];
          this.tasks.push(new Task(task.id, task.Name, task.Description, task.TaskStatus, task.TaskEntryDate, task.TaskCompletionDate));
        }
      }
    }, (err) => {});
  }

  create() {
    const modal = this.modalCtrl.create('TaskEditPage', {"task" : new Task(null,"","","",null,null)});
    modal.onDidDismiss((data) => {
      this.initialize();
    });
    modal.present();
  }

  refresh(refresher) {
    this.initialize();
    refresher.complete();
  }

  delete(task) {
    this.http.delete('http://localhost:3000/api/Tasks/'+task.id).subscribe((data) => {
      this.initialize();
    }, (err) => {});
  }
}
