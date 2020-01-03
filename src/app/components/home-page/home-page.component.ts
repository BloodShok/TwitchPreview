import { Component, OnInit } from '@angular/core';
import { TwitchService } from 'src/app/services/twitch.service';
import { TwitchStream } from 'src/app/models/twitch/streams';
import { TwitchGame } from 'src/app/models/twitch/top-games-info';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isHidden = true;
  rowHeight = 400;
  cols = 2;
  ngOnInit(): void {
    if (window.outerWidth < 820) {
      this.rowHeight = 200;
      this.cols = 2;
    }

    if (window.outerWidth < 500) {
      this.rowHeight = 200;
      this.cols = 1;
    }

    if (window.outerWidth > 500) {
      this.rowHeight = 200;
      this.cols = 2;
    }
    if (window.outerWidth > 820) {
      this.rowHeight = 400;
      this.cols = 2;
    }
  }

  onResize(event) {
    if (window.outerWidth < 820) {
      this.rowHeight = 200;
      this.cols = 2;
    }

    if (window.outerWidth < 500) {
      this.rowHeight = 200;
      this.cols = 1;
    }

    if (window.outerWidth > 500) {
      this.rowHeight = 200;
      this.cols = 2;
    }
    if (window.outerWidth > 820) {
      this.rowHeight = 400;
      this.cols = 2;
    }
  }

}
