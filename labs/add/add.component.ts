import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Select2 Dropdown
  selectRole: string[];
  selectTitle: string[];
  selectServiceType: string[];
  selectCode: string[];
  selectBG: string[];
  selectDegree: string[];
  selectServiceName: string[];
  selectArabicLanguage: string[];
  hidden: boolean;
  selected: any;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Labs' }, { label: 'New Lab', active: true }];
    
    // Select dropdown value
    // tslint:disable-next-line: max-line-length
    this.selectRole = ['Fedaa Sekar', 'Ghadeer Alqahtani', 'Raed Alamri', 'Amjed Zubidi', 'Muna Ibrahim'];
    this.selectTitle = ['Ms', 'Prof_Female', 'Prof_Male', 'Mr', 'Dr'];
    this.selectServiceType =['Vitamin IV Drips - Home visit'];
    this.selectCode =['+966'];
    this.selectBG =['A+','B+','AB+','A-','B-','AB-','O+','O-'];
    this.selectDegree =['David Miller','John Willamson','Mike Hussey','Nicolas Pooran','David Warner'];
    this.selectServiceName =['COVID-19 Test (PCR) at Home (The result from 24 hours)','A package of vitamins for restoring freshness and activity','Health Check Packages','Earrings Piercing'];
    this.selectArabicLanguage =['عربي','إنجليزي'];

    this.selected = '';
    this.hidden = true;
  }

}
