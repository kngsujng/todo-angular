import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { TodoService } from 'src/app/services/todo.service';
import { TodoItem } from 'src/app/model/todo';

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
  private readonly mapScriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${environment.NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
  map: any;
  myLocation: { latitude: number; longitude: number } | string = '';
  todoListWithLocation: TodoItem[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodoList();
    this.setUserLocation();
  }

  private loadTodoList(): void {
    this.todoService.getAllTodoList().subscribe((todos) => {
      this.todoListWithLocation = todos.filter(
        (todo) => todo.location !== undefined,
      );
    });
  }

  private setUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.onLocationSuccess(position),
        () => this.onLocationError(),
      );
    }
  }

  private onLocationSuccess(position: GeolocationPosition) {
    this.myLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    this.initializeMap();
  }

  private onLocationError(): void {
    this.myLocation = { latitude: 37.4979517, longitude: 127.0276188 };
    this.initializeMap();
  }

  private initializeMap(): void {
    if (!this.myLocation) return;
    const script = document.createElement('script');
    script.src = this.mapScriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    this.scriptElement.nativeElement.appendChild(script);
    script.onload = () => this.setupMap();
  }

  private setupMap(): void {
    if (typeof this.myLocation === 'string') return;
    var mapOptions = {
      useStyleMap: true,
      center: new naver.maps.LatLng(
        this.myLocation.latitude,
        this.myLocation.longitude,
      ),
      zoom: 12,
      zoomControl: true,
    };
    this.map = new naver.maps.Map('map', mapOptions);
    this.addMarker(this.myLocation);
    this.addTodoMarkers();
  }

  private addMarker(location: { latitude: number; longitude: number }): void {
    new naver.maps.Marker({
      position: new naver.maps.LatLng(location.latitude, location.longitude),
      map: this.map,
    });
  }

  private addTodoMarkers(): void {
    this.todoListWithLocation.forEach((todo) => {
      naver.maps.Service.geocode(
        {
          query: todo.location || '',
        },
        (status: any, response: any) => {
          if (status !== naver.maps.Service.Status.OK) return;

          const result = response.v2.addresses[0];
          this.addMarker({
            latitude: parseFloat(result.y),
            longitude: parseFloat(result.x),
          });
        },
      );
    });
  }
}
