import {Component} from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  public autoPlay: Boolean = true;
  images: string [] = ['./assets/img/energy2.jpg', './assets/img/energy4.jpg', './assets/img/energy3.jpg', './assets/img/energy1.jpg']
  i = 0;


}
