import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private router:Router, private location:Location){}

  onGoLoginPage(){
    this.router.navigateByUrl('/login')
  }

  onGoPrevPage(){
    this.location.back()
  }
}
