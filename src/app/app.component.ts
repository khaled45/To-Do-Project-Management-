import { ProjectService } from './services/project.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task';
  constructor(private MyProjectServices: ProjectService) {

  }
  ngOnInit(): void {
    this.MyProjectServices.LoadFirstTime()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.MyProjectServices.GetProjects().subscribe((resp: any) => {
    //   localStorage.setItem("Data", JSON.stringify(resp))
    // })
    localStorage.setItem("tttt", "xxxxxx")
  }
}
