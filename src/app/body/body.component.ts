import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  currentPage:string = 'PPC';

  onPageChanged(abbr:string) {
    this.currentPage = abbr;
  }

  constructor() { }

  ngOnInit() {
    // this.currentPage = 'PPC';
  }

}
