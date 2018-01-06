import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {
  category : string;

  constructor(route: ActivatedRoute) {
      this.category = route.snapshot.data.category;
  }

  ngOnInit() {
  }

}
