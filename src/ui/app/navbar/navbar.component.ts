import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentPage:string;
  @Output() onPageChanged = new EventEmitter<String>();

  changePage(abbr:string) {
    this.currentPage = abbr;
    this.onPageChanged.emit(abbr);
  }

  constructor() { }

  ngOnInit() {
    this.currentPage = 'PPC';
  }

}
