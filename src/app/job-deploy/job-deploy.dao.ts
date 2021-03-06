import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class JobDeployDao {

    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    requestOptions = {
        headers: new Headers(this.headerDict),
    };

    constructor(private http: Http, private authService: AuthService) { }

    loadNewJob() {
        return this.http.get('https://localhost:40143/jobSummary/New', this.requestOptions)
            .map(
                (res: Response) => {
                    const response = res.json();
                    return response;
                }
            );
    }

    loadNotNewJob() {
        return this.http.get('https://localhost:40143/jobSummary/Completed', this.requestOptions)
            .map(
                (res: Response) => {
                    const response = res.json();
                    return response;
                }
            );
    }

    buildJob(event: Event) {

        const data = '{ "jobID": "' + event.srcElement.id.toString() + '", "userID: "' + this.authService.userDetails.getUserId() + '" }';
        const ansibleServer = 'remote server hostname where ansible python script is residing';
        return this.http.post('http://' + ansibleServer + ':10280/buildJob', data, this.requestOptions)
            .map(
                (res: Response) => {
                    const response = res.json();
                    return response;
                }
            );
    }

}

