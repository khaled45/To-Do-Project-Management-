import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  UpdateProjectForm: any
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<HomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MyProjectServices: ProjectService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.UpdateProjectForm = new FormGroup({
      Title: new FormControl(this.data.ProjectData.Title, [Validators.required]),
      DeadlineDate: new FormControl(new Date(this.data.ProjectData.DeadlineDate), [Validators.required]),
      GithubLink: new FormControl(this.data.ProjectData.GithubLink, [Validators.required]),
      Describtion: new FormControl(this.data.ProjectData.Describtion, [Validators.required]),
      Url: new FormControl(this.data.ProjectData.Url),
      Priority: new FormControl(this.data.ProjectData.Priority, [Validators.required])
    })
  }
  UpdateProject() {
    this.MyProjectServices.EditeProject(this.UpdateProjectForm.value, this.data.ProjectData, this.data.type)
  }
  get FormControls() {
    return this.UpdateProjectForm.controls
  }
}
