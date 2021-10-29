import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Project } from '../interfaces/project';
import { ToastSevicesService } from './toast-sevices.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private ProjectList: BehaviorSubject<object>;

  constructor(private MyToastService: ToastSevicesService) {
    this.ProjectList = new BehaviorSubject<object>({ todo: [], inprocess: [], done: [] })
  }

  SetNewProject(newProject: Project): void {
    let ToDoList: any = []
    let length: number = 0
    let ProjectsList: any
    newProject.CreatedOn = new Date()
    this.GetProjects().subscribe((resp: any) => {
      ToDoList = resp.todo
      length = resp?.todo?.length + resp?.inprocess?.length + resp?.done?.length
      ProjectsList = resp

    })

    if (ToDoList && ToDoList?.length > 0) {
      newProject.id = length + 1
      ToDoList.push(newProject)
    } else {
      newProject.id = 1
      ToDoList = [newProject]
    }
    localStorage.setItem("todo", JSON.stringify(ToDoList))
    ProjectsList.todo = ToDoList
    this.ProjectList.next(ProjectsList);
    this.MyToastService.FireSuccessToast('Added', 'Your Project Added Successfully.')


  }

  GetProjects(): Observable<object> {
    return this.ProjectList.asObservable();
  }

  RemoveProject(Id: any, type: string) {
    let List: any
    let ProjectsList: any
    this.GetProjects().subscribe((resp: any) => {
      List = resp[type]
      ProjectsList = resp
    })
    List = List.filter((element: any) => element.id != Id)
    ProjectsList[type] = List
    this.ProjectList.next(ProjectsList);
    localStorage.setItem(type, JSON.stringify(List))

    this.MyToastService.FireSuccessToast("Deleted!", 'Your file has been deleted.')

  }

  EditeProject(UpdatedItem: Project, OldObject: any, type: string) {
    let List: any
    let ProjectsList: any
    this.GetProjects().subscribe((resp: any) => {
      List = resp[type]
      ProjectsList = resp
    })
    let index = List.indexOf(OldObject)
    List[index] = UpdatedItem
    List[index].id = OldObject.id
    List[index].CreatedOn = OldObject.CreatedOn
    ProjectsList[type] = List
    this.ProjectList.next(ProjectsList);

    localStorage.setItem(type, JSON.stringify(List))
    this.MyToastService.FireSuccessToast("Update", 'Your Project Updated Successfully.')

  }

  LoadFirstTime() {
    let ToDoList: any = localStorage.getItem("todo")
    let InProcessList: any = localStorage.getItem("inprocess")
    let DoneList: any = localStorage.getItem("done")
    this.ProjectList.next({ todo: JSON.parse(ToDoList), inprocess: JSON.parse(InProcessList), done: JSON.parse(DoneList) })

  }

  UpdateListsOnDragAndDrop(ToDoList: any, InProcessList: any, DoneList: any) {
    if (!DoneList)
      DoneList = []
    if (!InProcessList)
      InProcessList = []
    if (!ToDoList)
      ToDoList = []
    let Data = { todo: ToDoList, inprocess: InProcessList, done: DoneList }
    this.ProjectList.next(Data)
  }


}
