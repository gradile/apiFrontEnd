import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "../models/category";
import { ApiService } from "../services/api.service";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-matter-create",
  templateUrl: "./matter-create.component.html",
  styleUrls: ["./matter-create.component.scss"]
})
export class MatterCreateComponent implements OnInit {
  categories: Category[];
  newFileNumberString: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  isSubmitted = false;
  matterForm: FormGroup;
  fileNumber: string;

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      message => (this.fileNumber = message)
    );

    this.matterForm = this.fb.group({
      case_file_number: [{ value: this.fileNumber, disabled: true }],
      case_first_name: ["", Validators.required],
      case_last_name: ["", Validators.required],
      case_subcategory: ["", Validators.required],
      case_creation_date: [""],
      case_closed_date: [""],
      case_box: [""],
      case_author: ["", Validators.required]
    });
  }
  get formControls() {
    return this.matterForm.controls;
  }
  createMatter(): void {
    const data = this.matterForm.getRawValue();

    this.apiService.createMatter(data).subscribe(
      response => {
        // console.log(response);
        this.isSubmitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newMatter() {
    this.router.navigateByUrl("/autonumber").then(e => {
      if (e) {
        console.log("navigation good");
      } else {
        console.log("navigation bad");
      }
    });
  }
}
