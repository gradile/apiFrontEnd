import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
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

  // matter: Matter = {
  //   case_number_id: null,
  //   case_file_number: "",
  //   case_first_name: "",
  //   case_last_name: "",
  //   case_subcategory: "",
  //   case_creation_date: null,
  //   case_closed_date: null,
  //   case_box: null,
  //   case_author: ""
  // };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    //   this.editMode = params["id"] != null;
    // });

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log("id from details", this.id);

    this.editMatterForm = new FormGroup({
      case_file_number: new FormControl(""),
      case_first_name: new FormControl(""),
      case_last_name: new FormControl(""),
      case_subcategory: new FormControl(""),
      case_closed_date: new FormControl(""),
      case_box: new FormControl(""),
      case_author: new FormControl("")
    });

    this.apiService.read(this.id).subscribe(matter => {
      this.currentMatter = matter;
      console.log("matter from service", matter);
      console.log("current matter", this.currentMatter);
      this.editMatterForm.patchValue({
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

  //   this.patchForm.patchValue({
  //     age: this.fetchedProjFunc['age'],
  //     name: this.fetchedProjFunc['name'],
  //     numberLegs: this.fetchedProjFunc['numberLegs']
  //    });
  // });

  // editMatterForm = new FormGroup({
  //   case_file_number: new FormControl({
  //     value: this.currentMatter.case_file_number
  //   }),
  //   case_first_name: new FormControl(this.currentMatter.case_first_name),
  //   case_last_name: new FormControl(this.currentMatter.case_last_name),
  //   case_subcategory: new FormControl(this.currentMatter.case_subcategory),
  //   case_closed_date: new FormControl(this.currentMatter.case_closed_date),
  //   case_box: new FormControl(this.currentMatter.case_box),
  //   case_author: new FormControl(this.currentMatter.case_author)
  // });
  // }

  get formControls() {
    return this.editMatterForm.controls;
  }
}
