import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Matter } from "../models/matter";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-matter-details",
  templateUrl: "./matter-details.component.html",
  styleUrls: ["./matter-details.component.scss"]
})
export class MatterDetailsComponent implements OnInit {
  currentMatter: Matter = {
    case_number_id: null,
    case_file_number: "",
    case_first_name: "",
    case_last_name: "",
    case_subcategory: "",
    case_creation_date: null,
    case_closed_date: null,
    case_box: null,
    case_author: ""
  };
  message = "";
  editMatterForm: FormGroup;
  id;
  matters: any;
  editMode = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log("id from details", this.id);

    this.editMatterForm = this.fb.group({
      case_number_id: [{ value: this.id, disabled: true }],
      case_file_number: [""],
      case_first_name: ["", Validators.required],
      case_last_name: ["", Validators.required],
      case_subcategory: ["", Validators.required],
      case_creation_date: [""],
      case_closed_date: [""],
      case_box: [""],
      case_author: ["", Validators.required]
    });

    this.apiService.read(this.id).subscribe(matter => {
      this.currentMatter = matter;
      console.log("matter from service", matter);
      console.log("current matter", this.currentMatter);
      this.editMatterForm.patchValue({
        case_number_id: this.currentMatter["case_number_id"],
        case_file_number: this.currentMatter["case_file_number"],
        case_first_name: this.currentMatter["case_first_name"],
        case_last_name: this.currentMatter["case_last_name"],
        case_subcategory: this.currentMatter["case_subcategory"],
        case_closed_date: this.currentMatter["case_closed_date"],
        case_box: this.currentMatter["case_box"],
        case_author: this.currentMatter["case_author"]
      });
    });
  }

  get formControls() {
    return this.editMatterForm.controls;
  }

  updateMatter() {
    const data = this.editMatterForm.getRawValue();
    console.log("form data", data);

    this.apiService.updateMatter(this.id, data).subscribe(
      response => {
        console.log("response", response);
        this.message = "The matter has been updated";
      },
      error => {
        console.log(error);
      }
    );
  }
}
