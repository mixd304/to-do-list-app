import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, bounceOutRight, slideOutRight, flipInX } from 'ng-animate';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(flipInX))])
  ],
})
export class TestComponent implements OnInit {

  bounce: any;
  constructor() { }

  ngOnInit() {
  }

}
