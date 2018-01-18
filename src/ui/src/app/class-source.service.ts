import { Injectable }     from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiCallResponse } from './api-call-response';

@Injectable()
export class ClassSourceService {

    constructor(private http: HttpClient) {}

    getClasses(category : string) {
        return this.http.get('cgf/existing-gened-classes/' + category)
    }
}
