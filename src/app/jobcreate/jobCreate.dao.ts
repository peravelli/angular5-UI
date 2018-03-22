import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { JobCreateModel } from './jobCreate.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobCreateDao {

    jobCreateModel: JobCreateModel;
    temp: IMultiSelectOption[] = [];
    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    requestOptions = {
        headers: new Headers(this.headerDict),
    };

    constructor(private http: Http) { }

    renderJobCreate(): JobCreateModel {

        this.jobCreateModel = new JobCreateModel();
        const requestTypeOptions: IMultiSelectOption[] = [
            { id: 1, name: 'Incident Request' },
            { id: 2, name: 'Change Request' }
        ];
        const data = '{"dropdownName": "applications", "responseFilter": {}}';
        this.jobCreateModel.setRequestTypeOptions(requestTypeOptions);
        this.getDropdowns(data)
        .subscribe(
            (response: any) => {
                this.temp = [];
                // tslint:disable-next-line:prefer-const
                for (let res of response) {
                    this.temp.push({id: res['appId'], name: res['appName'] });
                }
                this.jobCreateModel.setApplicationOptions(this.temp);
            },
            (error) => console.log(error)
        );
        return this.jobCreateModel;
    }

    getDropdowns(data: String) {
        // get the dropdown from server
        return this.http.post('https://localhost:20143/load/operations/dropdown', data, this.requestOptions)
            .map(
            (res: Response) => {
                const response = res.json();
                return response;
            }
            );
    }
    createJob(data: String) {
        return this.http.post('https://localhost:30143/jobCreate', data, this.requestOptions)
            .map(
            (res: Response) => {
                console.log('res: ' + res);
                const response = res.json();
                return response;
            }
            );
    }
}
