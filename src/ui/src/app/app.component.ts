import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    category : string;
    constructor(route: ActivatedRoute) {
        this.category = route.snapshot.data.category;
    }

}
