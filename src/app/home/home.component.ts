import { Component, HostListener, OnInit } from '@angular/core';
import { IAuthResult } from '../models/IAuthResult';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';
import { AfterViewInit, ElementRef} from '@angular/core';
import gsap from 'gsap';
import { IEvent } from '../models/IEvent';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    cbon : boolean = false
    events : IEvent[] | undefined
  
  
    // var for transition
    scrollSpeed : number = 0
    oldScrollY : number = 0
    scrollY : number = 0
    y : number = 0
    menu : any 
    items : any 
    itemWidth : number = 0
    wrapWidth : any 
  
    menuWidth : any
    
     ngAfterViewInit(): void {
      // console.log(this._er.nativeElement.querySelectorAll('.menu--item')[0]['clientWidth'])
      
      /*---------------
        Listenner
      ---------------*/
      
     }
     ngOnInit(): void {
      this._es.getAll()
      this._es.$events.subscribe({
        next : (res : IEvent[]| undefined) => {
          this.events = res  
          setTimeout(() => {
            this.items = this._er.nativeElement.querySelectorAll('.menu--item')
          this. itemWidth =  this.items[0]['clientWidth']
          this.menu = this._er.nativeElement.querySelector('.menu')
          this.wrapWidth =  this.items.length * this.itemWidth
          this.menuWidth = this.menu.clientWidth
          this.dispose(0)
          this.render()
          this.menu.addEventListener('mousewheel', this.handleMouseWheel)
    
          this.menu.addEventListener('touchstart', this.handleTouchStart)
          this.menu.addEventListener('touchmove', this.handleTouchMove)
          this.menu.addEventListener('touchend', this.handleTouchEnd)
        
          this.menu.addEventListener('mousedown', this.handleTouchStart)
          this.menu.addEventListener('mousemove', this.handleTouchMove)
          this.menu.addEventListener('mouseleave', this.handleTouchEnd)
          this.menu.addEventListener('mouseup', this.handleTouchEnd)
          this.menu.addEventListener('selectstart', () => { return false })
          window.addEventListener('resize', () => {
            this.menuWidth = this.menu.clientWidth
            this.itemWidth = this.items[0].clientWidth
            this.wrapWidth = this.items.length * this.itemWidth
          })
          this.cbon = true
          
          }, 2000);    
          
        },
        error : (err) => {
          console.log(err)
        } 
      })
     
     }
    
    
    constructor(private _er : ElementRef, private _es : EventService){
      
    }
    /*--------------------
    Lerp
    --------------------*/
    lerp   (v0 : any, v1 : number, t : number) : number {
      return v0 * ( 1 - t ) + v1 * t
    }
    
    
    /*--------------------
    Dispose
    --------------------*/
    dispose (scroll : number) : number | string {
      gsap.set(this.items, {
        x: (i : number) => {
          return i * this.itemWidth + scroll
        },
        modifiers: {
          x: (x : any, target : any) => {
            const s : any= gsap.utils.wrap(-this.itemWidth, this.wrapWidth - this.itemWidth, parseInt(x))
            return `${s}px`
          }
        }
      })
      return ''
    } 
    
  
    
    
    /*--------------------
    Wheel
    --------------------*/
    handleMouseWheel (e : any) : void {
      this.scrollY -= e.deltaY * 0.9
    }
    
    
    /*--------------------
    Touch
    --------------------*/
    touchStart : number= 0
    touchX : number = 0 
    isDragging : boolean = false
    handleTouchStart(e : any) : void  {
      this.touchStart = e.clientX || e.touches[0].clientX
      this.isDragging = true
      this.menu?.classList.add('is-dragging')
    }
    handleTouchMove(e : any) : void {
      if (!this.isDragging) return
      this.touchX = e.clientX || e.touches[0].clientX
      scrollY += (this.touchX - this.touchStart) * 2.5
      this.touchStart = this.touchX
    }
     handleTouchEnd() : void {
      this.isDragging = false
      this.menu?.classList.remove('is-dragging')
    }
    
    
    
    /*--------------------
    Render
    --------------------*/
    render = ()  => {
      requestAnimationFrame(this.render)
      this.y = this.lerp(this.y, scrollY, .1)
      this.dispose(this.y)
      
      this.scrollSpeed = this.y - this.oldScrollY
      this.oldScrollY = this.y
      
      gsap.to(this.items, {
        skewX: -this.scrollSpeed * .2,
        rotate: this.scrollSpeed * .01,
        scale: 1 - Math.min(100, Math.abs(this.scrollSpeed)) * 0.003
      })
    }
    
  }
  
  
