import { UpdateProjectComponent } from './../update-project/update-project.component';
import { Project } from './../interfaces/project';
import { ProjectService } from './../services/project.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  DataList: Project[] = []
  FilteredList: Project[] = []
  todo: any = []
  InProcess: any = []
  done: any = []


  constructor(private MyProjectServices: ProjectService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<[UpdateProjectComponent]>) { }

  ngOnInit(): void {
    this.MyProjectServices.GetProjects().subscribe((resp: any) => {
      if (resp) {
        if (resp.todo)
          this.todo = resp.todo
        if (resp.inprocess)
          this.InProcess = resp.inprocess
        if (resp.done)
          this.done = resp.done
      }
    })
  }


  Remove(Id: any, type: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.MyProjectServices.RemoveProject(Id, type)
      }
    })
  }


  UpdateDialog(element: any, type: string) {
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
      data: { ProjectData: element, type: type }
    });
    dialogRef.afterClosed().subscribe((result) => { })
  }


  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.UpdateLocalStorage()
  }

  UpdateLocalStorage(): void {
    localStorage.setItem("todo", JSON.stringify(this.todo))
    localStorage.setItem("inprocess", JSON.stringify(this.InProcess))
    localStorage.setItem("done", JSON.stringify(this.done))
    console.log(this.todo, this.InProcess, this.done);
    this.MyProjectServices.UpdateListsOnDragAndDrop(this.todo, this.InProcess, this.done)
  }



}
