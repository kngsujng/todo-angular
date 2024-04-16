import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${environment.NAVER_MAP_CLIENT_ID}`;
declare var naver: any;

@Component({
  selector: 'app-naver-map',
  standalone: true,
  imports: [],
  templateUrl: './naver-map.component.html',
  styleUrl: './naver-map.component.scss',
})
export class NaverMapComponent implements AfterViewInit {
  @ViewChild('script', { static: false }) // ViewChild를 이용해서 DOM 조작
  script!: ElementRef;
  map: any;

  constructor() {}

  ngAfterViewInit() {
    const parent = this;
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    this.script.nativeElement.appendChild(script);
    script.onload = function () {
      var mapOptions = {
        useStyleMap: true,
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      };
      parent.map = new naver.maps.Map('map', mapOptions);
    };
  }

  // center() {
  //   this.map.setCenter(new naver.maps.LatLng(37.3595704, 127.105399));
  //   this.map.setZoom(15);
  // }
}
