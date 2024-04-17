import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${environment.NAVER_MAP_CLIENT_ID}`;
declare var naver: any;

@Component({
  selector: 'app-naver-map',
  standalone: true,
  imports: [],
  templateUrl: './naver-map.component.html',
  styleUrl: './naver-map.component.scss',
})
export class NaverMapComponent implements OnInit, AfterViewInit {
  // ViewChild를 이용해서 DOM 조작
  // { static: false } : 동적으로 생성되거나 조건부로 포함되는 컨텐츠
  @ViewChild('script', { static: false }) scriptElement!: ElementRef;
  map: any;
  myLocation: { latitude: number; longitude: number } | string = '';

  constructor() {}

  // // 현재 위치 가져오기---------
  ngOnInit(): void {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => this.success(position),
    //       () => this.error(),
    //     );
    //   }
  }

  // private success(position: GeolocationPosition) {
  //   this.myLocation = {
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude,
  //   };
  // }

  // private error() {
  //   this.myLocation = { latitude: 37.4979517, longitude: 127.0276188 };
  // }
  // // ------------

  ngAfterViewInit() {
    // 지도 생성
    const parent = this;
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    this.scriptElement.nativeElement.appendChild(script);
    script.onload = function () {
      var mapOptions = {
        useStyleMap: true,
        center: new naver.maps.LatLng(37.3595704, 127.105399),
      };
      parent.map = new naver.maps.Map('map', mapOptions);

      // 지도가 로드된 후 마커 생성
      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: parent.map,
        // icon: {
        //   content: [markerHtml('현재 위치')].join(''),
        //   size: new naver.maps.Size(38, 58),
        //   anchor: new naver.maps.Point(19, 58),
        // },
      });
    };
  }
}
