import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
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
  matter = {
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

  submitted = false;
  newFileNumberString: string;

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      message => (this.newFileNumberString = message)
    );
  }

  createMatter(): void {
    const data = {
      case_number_id: this.matter.case_number_id,
      case_file_number: this.matter.case_file_number,
      case_first_name: this.matter.case_first_name,
      case_last_name: this.matter.case_last_name,
      case_subcategory: this.matter.case_subcategory,
      case_creation_date: this.matter.case_creation_date,
      case_closed_date: this.matter.case_closed_date,
      case_box: this.matter.case_box,
      case_author: this.matter.case_author
    };

    this.apiService.createMatter(data).subscribe(
      response => {
        // console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newMatter(): void {
    this.submitted = false;
    this.matter = {
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
  }
}
