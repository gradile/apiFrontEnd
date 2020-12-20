import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Matter } from '../models/matter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService) { }

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
  }

  ngOnInit() {
    this.apiService.readMatters().subscribe((matters: Matter[]) => {
      this.matters = matters;
      console.log(this.matters);
    })
  }
  createOrUpdateMatter(form) {
    if (this.selectedMatter && this.selectedMatter.case_number_id) {
      form.value.id = this.selectedMatter.case_number_id;
      console.log('form id', form.value.id);
      this.apiService.updateMatter(form.value).subscribe((matter: Matter) => {
        console.log("Matter updated ", matter);
      });
    } else {
      console.log('form value', form.value);
      this.apiService.createMatter(form.value).subscribe((matter: Matter) => {
        console.log("Matter created ", matter);

      });
    }
  }

  selectMatter(matter: Matter) {
    this.selectedMatter = matter;
  }

  deleteMatter(id) {
    this.apiService.deleteMatter(id).subscribe((matter: Matter) => {
      console.log("id ", id);
      console.log("Matter deleted ", matter);
    });
  }

}