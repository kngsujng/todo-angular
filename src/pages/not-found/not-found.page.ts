import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss'
})
export class NotFoundPage {

  constructor(private router:Router, private location:Location){}

  onGoLoginPage(){
    this.router.navigateByUrl('/login')
  }

  onGoPrevPage(){
    this.location.back()
  }
}
