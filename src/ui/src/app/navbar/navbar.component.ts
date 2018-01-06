import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() category : string;

  ppcClass;
  sdmClass;
  iiClass;
  weClass;

  update() {
      this.ppcClass = {
        'nav-item': true,
        'nav-link': true,
        'active': this.category === 'ppc'
      };

      this.sdmClass = {
        'nav-item': true,
        'nav-link': true,
        'active': this.category === 'sdm'
      };

      this.iiClass = {
        'nav-item': true,
        'nav-link': true,
        'active': this.category === 'ii'
      };

      this.weClass = {
        'nav-item': true,
        'nav-link': true,
        'active': this.category === 'we'
      };
  }

  ngOnInit() {
      this.update()
  }

  onClick(category : string) {
    this.category = category;
    this.update();
  }

}
