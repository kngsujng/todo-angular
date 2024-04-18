import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { TodoService } from 'src/app/services/todo.service';
import { TodoItem } from 'src/app/model/todo';

const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${environment.NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
declare var naver: any;

@Component({
  selector: 'app-naver-map',
  standalone: true,
  imports: [TodosListComponent],
  templateUrl: './naver-map.component.html',
  styleUrl: './naver-map.component.scss',
})
export class NaverMapComponent implements OnInit {
  // ViewChild를 이용해서 DOM 조작
  // { static: false } : 동적으로 생성되거나 조건부로 포함되는 컨텐츠
  @ViewChild('script', { static: false }) scriptElement!: ElementRef;
  map: any;
  myLocation: { latitude: number; longitude: number } | string = '';
  todoListWithLocation: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // todoList 할당 ------
    this.todoService.getAllTodoList().subscribe({
      next: (todos) =>
        (this.todoListWithLocation = todos.filter(
          (todo) => todo.location !== undefined,
        )),
    });
    // -----------

    // 현재 위치 가져오기---------
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.success(position),
        () => this.error(),
      );
    }
  }

  private success(position: GeolocationPosition) {
    this.myLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    this.initializeMap();
  }

  private error() {
    this.myLocation = { latitude: 37.4979517, longitude: 127.0276188 };
    this.initializeMap();
  }
  // ------------

  initializeMap() {
    // 지도 생성 ------
    const parent = this;
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    this.scriptElement.nativeElement.appendChild(script);
    script.onload = function () {
      if (typeof parent.myLocation !== 'string') {
        var mapOptions = {
          useStyleMap: true,
          center: new naver.maps.LatLng(
            parent.myLocation.latitude,
            parent.myLocation.longitude,
          ),
          zoom: 12,
          zoomControl: true,
        };
        parent.map = new naver.maps.Map('map', mapOptions);

        // 지도가 로드된 후 "현위치" 마커 생성
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            parent.myLocation.latitude,
            parent.myLocation.longitude,
          ),
          map: parent.map,
        });

        // "location 있는 todoItem" 주소 좌표로 변경 후 마커 생성
        naver.maps.Service.geocode(
          {
            query: '전남 나주시 경현동',
          },
          function (status: any, response: any) {
            if (status !== naver.maps.Service.Status.OK) {
              console.log('주소를 표시할 수 없습니다.');
            }

            const result = response.v2,
              addressArr = result.addresses;

            new naver.maps.Marker({
              position: new naver.maps.LatLng(addressArr[0].y, addressArr[0].x),
              map: parent.map,
            });
          },
        );
      }
    };
  }
}
