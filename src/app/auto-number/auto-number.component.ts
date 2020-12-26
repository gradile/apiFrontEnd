import { Component, OnInit } from "@angular/core";
import { Category } from "../models/category";
import { Matter } from "../models/matter";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-auto-number",
  templateUrl: "./auto-number.component.html",
  styleUrls: ["./auto-number.component.scss"]
})
export class AutoNumberComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  matters: Matter[];
  selectedMatter: Matter = {
    case_number_id: null,
    case_file_number: null,
    case_first_name: null,
    case_last_name: null,
    case_subcategory: null,
    case_creation_date: null,
    case_closed_date: null,
    case_box: null,
    case_author: null
  };

  categories: Category[];
  lastCaseNumber: any;
  shortYear: string;
  shortMonth: number;
  fileOrder: string;
  newFileOrder: number;
  finalFileOrder: string;
  newFirstFour: string;
  storedFirstFour: string;
  firstFourComparison: number;
  actualMonth: string;
  newCaseNumber: string;

  ngOnInit() {
    this.apiService.readMatters().subscribe((matters: Matter[]) => {
      this.matters = matters;
      console.log("Cases", this.matters);
    });

    this.apiService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log("categories", this.categories);
    });

    this.createNewCaseNumber();
  }

  createNewCaseNumber() {
    this.apiService.getLastCaseNumber().subscribe(data => {
      this.lastCaseNumber = data.case_file_number;
      console.log("last case", this.lastCaseNumber);

      //get the last 2 of the year
      // this.shortYear = new Date("January 23, 2024")
      this.shortYear = new Date()
        .getFullYear()
        .toString()
        .substr(-2);
      console.log("short year", this.shortYear);

      //get the actual month
      // let m = new Date("November 20, 69 00:20:18");
      let m = new Date();
      let month = m.getMonth();
      this.shortMonth = month + 1;
      if (this.shortMonth < 10) {
        this.actualMonth = this.shortMonth.toString().padStart(2, "0");
      } else {
        this.actualMonth = this.shortMonth.toString();
      }
      console.log("short month", this.shortMonth);
      console.log("actual month", this.actualMonth);

      // get the new first 4 chars
      this.newFirstFour = this.shortYear + this.actualMonth;
      console.log("new first four", this.newFirstFour);

      // get the file order for the month
      this.fileOrder = this.lastCaseNumber.substr(5, 3);
      console.log("file order", this.fileOrder);

      //get the first 4 chars of the stored last case number
      this.storedFirstFour = this.lastCaseNumber.substr(0, 4);
      console.log("storedFirstFour", this.storedFirstFour);

      this.firstFourComparison = this.storedFirstFour.localeCompare(
        this.newFirstFour
      );
      console.log("comparison", this.firstFourComparison);

      if (this.firstFourComparison == 0) {
        this.newFileOrder = parseInt(this.fileOrder) + 1;
      } else {
        this.newFileOrder = 1;
      }

      if (this.newFileOrder < 100) {
        this.finalFileOrder = this.newFileOrder.toString().padStart(3, "0");
      } else if (this.newFileOrder < 10) {
        this.finalFileOrder = this.newFileOrder.toString().padStart(2, "0");
      }

      console.log("final order", this.finalFileOrder);
      this.newCaseNumber = this.newFirstFour + "-" + this.finalFileOrder + "-";
      console.log("new case number", this.newCaseNumber);
    });
  }

  getNextCaseNumber() {
    // let month = this.lastCaseNumber;
    // this.fileOrder = this.lastCaseNumber.substr(5, 3);
    // console.log("month", this.month);
    // console.log("file order", this.fileOrder);
    // return month;
  }
}
