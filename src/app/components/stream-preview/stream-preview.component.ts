import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { TwitchStream } from 'src/app/models/twitch/streams';
import { Router } from '@angular/router';
import { Stream } from 'src/app/models/view-models/stream';
import { Platform } from 'src/app/global-resources/constants';

@Component({
  selector: 'app-stream-preview',
  templateUrl: './stream-preview.component.html',
  styleUrls: ['./stream-preview.component.scss']
})
export class StreamPreviewComponent implements OnInit {


  @Input() translationPreview: Stream = null;
  @ViewChild('cardTitle', {static: false}) cardTitle: ElementRef<HTMLElement>;
  width = 75;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToStream(platform: Platform, userName: string, gameId: string, ) {
    this.router.navigate(['stream', platform, userName, gameId]);
  }
}
