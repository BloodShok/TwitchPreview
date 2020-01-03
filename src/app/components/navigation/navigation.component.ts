import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  isInternetConnected = true;
  needToReload = false;
  mobileMode = false;


  ngOnInit(): void {

    if (window.innerWidth < 400) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }

    this.createOnline$().subscribe(internetCon => {
      this.isInternetConnected = internetCon;
      if (internetCon && this.needToReload) {
        this.needToReload = false;
        window.location.reload();
      }
      if (!internetCon) {
        this.needToReload = true;
      }
    });
  }




  goHome() {
    this.router.navigate(['/']);
  }


  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

}
