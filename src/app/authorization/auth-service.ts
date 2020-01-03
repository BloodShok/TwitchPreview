import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService implements HttpInterceptor {

    headers = new HttpHeaders();

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.headers.set('Client-ID', '');


        // if ( req.url.includes('api.twitch.tv')) {
        //    console.log('Twitch');
        // }
        const modifiedReq = req.clone({
            headers: new HttpHeaders(
                {
                    'Client-ID': '',
                     Authorization: 'Bearer '
                })
        });
        return next.handle(modifiedReq);
    }
}
