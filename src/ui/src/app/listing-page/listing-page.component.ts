import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {
  @Input() category : string;

  constructor() { }

  ngOnInit() {
  }

}
