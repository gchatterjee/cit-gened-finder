import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ClassSourceService } from '../class-source.service';
import { ApiCallResponse } from '../api-call-response';

@Component({
    selector: 'app-listing-page',
    templateUrl: './listing-page.component.html',
    styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {
    titleMap = {
        'ppc'   : 'People, Places, and Culture',
        'sdm'   : 'Social Analysis and Decision Making',
        'ii'    : 'Innovation and Internationalization',
        'we'    : 'Writing and Expression'
    };
    dayMap = {
        0 : 'Sunday',
        1 : 'Monday',
        2 : 'Tuesday',
        3 : 'Wednesday',
        4 : 'Thursday',
        5 : 'Friday',
        6 : 'Saturday'
    };

    category : string;
    title : string;
    classes : any;

    constructor(route: ActivatedRoute, private classSource: ClassSourceService) {
        this.category = route.snapshot.data.category;
    }

    ngOnInit() {
        this.title = this.titleMap[this.category];
        this.classSource.getClasses(this.category).subscribe(
            res => {
                var response : ApiCallResponse = <ApiCallResponse>res;
                this.classes = response.data;
                console.log(this.classes);
            },
            err => {
                this.classes = [ <string>err ];
            }
        )
    }

    formatCourseNumber(number : string) {
        let deptNum = number.slice(0,2);
        let courseNum = number.slice(2,5);
        return (deptNum + '-' + courseNum);
    }

    numToDay(number : number) {
        
    }
}
