import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Category } from "../models/category";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ApiService } from "../services/api.service";
import { DataService } from "../services/data.service";
import { FileNumber } from "../models/file-number";
import { Router } from "@angular/router";

@Component({
  selector: "app-auto-number",
  templateUrl: "./auto-number.component.html",
  styleUrls: ["./auto-number.component.scss"]
})
export class AutoNumberComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router
  ) {}

  newFileNumber: FileNumber = {
    fileNumber: "",
    category: ""
  };

  categories: Category[];
  default: string = "Please select a category";

  newCaseIdentifier: string = "";
  completeIdentifier: string;
  lastCaseIdentifier: any;
  shortYearString: string;
  thisMonthNumber: number;
  thisMonthString: string;
  currentMonthString: string;
  fileOrder: string;
  newFileOrder: number;
  finalFileOrder: string;
  newFirstFour: string;
  storedMonthString: string;
  storedMonthNumber: number;
  monthsComparison: number;

  ngOnInit() {
    this.apiService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      //  console.log("categories", this.categories);
    });

    this.dataService.currentMessage.subscribe(
      message => (this.newCaseIdentifier = message)
    );

    this.createNewCaseNumber();
    // this.dataService.changeData(this.newCaseIdentifier);
    console.log("file number from child", this.newCaseIdentifier);
    console.log("create", this.createNewCaseNumber());

    this.newFileNumber.fileNumber = this.newCaseIdentifier;
  }

  createNewCaseNumber() {
    this.apiService.getLastCaseNumber().subscribe(data => {
      this.lastCaseIdentifier = data.case_file_number;
      console.log("last case", this.lastCaseIdentifier);

      //get the last 2 of the year
      //this.shortYearString = new Date("December 20, 2018")
      this.shortYearString = new Date()
        .getFullYear()
        .toString()
        .substr(-2);
      // console.log("short year", this.shortYear);

      //get the actual month
      //let m = new Date("December 20, 2018 00:20:18");
      let m = new Date();
      let month = m.getMonth();
      this.thisMonthNumber = month + 1;
      if (this.thisMonthNumber < 10) {
        this.currentMonthString = this.thisMonthNumber
          .toString()
          .padStart(2, "0");
      } else {
        this.currentMonthString = this.thisMonthNumber.toString();
      }
      // console.log("short month", this.thisMonth.;
      // console.log("actual month", this.actualMonth);

      // get the new first 4 chars
      this.newFirstFour = this.shortYearString + this.currentMonthString;
      console.log("new first four", this.newFirstFour);

      // get the file order for the month

      this.fileOrder = this.lastCaseIdentifier.substr(5, 3);
      // console.log("file order", this.fileOrder);

      // get the last stored month and parse to number
      this.storedMonthString = this.lastCaseIdentifier.substr(2, 2);
      this.storedMonthNumber = parseInt(this.storedMonthString);
      console.log("stored Month number", this.storedMonthNumber);
      console.log("current Month number", this.thisMonthNumber);

      // compare the stored month with the current month. If month change, begin new series
      if (this.storedMonthNumber === this.thisMonthNumber) {
        this.newFileOrder = parseInt(this.fileOrder) + 1;
      } else {
        this.newFileOrder = 1;
      }

      // pad with zeros if the number has only one or two digits
      if (this.newFileOrder < 100) {
        this.finalFileOrder = this.newFileOrder.toString().padStart(3, "0");
      } else if (this.newFileOrder < 10) {
        this.finalFileOrder = this.newFileOrder.toString().padStart(2, "0");
      }

      console.log("final order", this.finalFileOrder);
      this.newCaseIdentifier =
        this.newFirstFour + "-" + this.finalFileOrder + "-";
      console.log("new case number", this.newCaseIdentifier);
    });

    return this.newCaseIdentifier;
  }

  getNextCaseNumber(): void {
    const data = {
      fileNumber: this.newCaseIdentifier,
      category: this.newFileNumber.category
    };
    console.log("form data", data);

    this.completeIdentifier = data.fileNumber + data.category;
    console.log("complete number", this.completeIdentifier);

    this.dataService.changeData(this.completeIdentifier.toString());

    this.router.navigateByUrl("/create").then(e => {
      if (e) {
        console.log("navigation good");
      } else {
        console.log("navigation bad");
      }
    });
  }
}
