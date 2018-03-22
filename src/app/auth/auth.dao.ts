import { LoginForm } from './signin.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthDAO {
    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
      };
    constructor (private http: Http) {}
    login(data: any) {
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          };
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post('https://localhost:10143/login', data, requestOptions)
        .map(
            (res: Response) => {
                const response = res.json();
                return response;
            }
        );
    }

}
