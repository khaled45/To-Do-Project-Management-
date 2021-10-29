import { ProjectService } from './../services/project.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  AddProjectForm: FormGroup = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    DeadlineDate: new FormControl('', [Validators.required]),
    GithubLink: new FormControl('', [Validators.required]),
    Describtion: new FormControl('', [Validators.required]),
    Url: new FormControl(''),
    Priority: new FormControl(1, [Validators.required])
  })
  constructor(private MyProjectServices: ProjectService,
    private MyDatePipe: DatePipe,
    private MyRouter: Router) { }

  ngOnInit(): void {
  }


  AddProject() {
    console.log(this.AddProjectForm.value);
    let Data = this.AddProjectForm.value
    this.MyProjectServices.SetNewProject(Data)
    this.MyRouter.navigate(["/"])
  }

  get FormControls() {
    return this.AddProjectForm.controls
  }
}
