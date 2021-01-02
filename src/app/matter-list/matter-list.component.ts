import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Matter } from "../models/matter";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-matter-list",
  templateUrl: "./matter-list.component.html",
  styleUrls: ["./matter-list.component.scss"]
})
export class MatterListComponent implements OnInit {
  matters: Matter[];
  currentMatter = null;
  currentIndex = -1;
  case_file_name = "";
  id: any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.readMatters();
  }

  readMatters(): void {
    this.apiService.readMatters().subscribe(
      matters => {
        this.matters = matters;
      },
      error => {
        console.log(error);
      }
    );
  }

  setCurrentMatter(matter, index): void {
    this.currentMatter = matter;
    this.currentIndex = index;
    this.id = this.currentMatter.case_number_id;
    console.log("matter from list", this.currentMatter);
    console.log("id", this.id);

    const pathToEdit = "/details/" + this.id;
    console.log("/details/", pathToEdit);
    //  this.router.navigateByUrl(pathToEdit);
    // console.log(this.router.navigateByUrl("/details/", id));
  }

  editButtonClick(id: number) {
    this.router.navigate(["/details", id]);
  }
  refresh(): void {
    this.readMatters();
    this.currentMatter = null;
    this.currentIndex = -1;
  }
}
