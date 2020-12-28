import { Component, OnInit } from "@angular/core";
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

  constructor(private apiService: ApiService) {}

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

  refresh(): void {
    this.readMatters();
    this.currentMatter = null;
    this.currentIndex = -1;
  }
}
