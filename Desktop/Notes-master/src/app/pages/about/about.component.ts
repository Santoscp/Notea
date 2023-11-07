import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  src='https://source.unsplash.com/random'
  url= 'https://api.kanye.rest/'
  msg=''
  ngOnInit(): void {
    fetch(this.url)
    .then(response=> response.json())
    .then(data=>this.msg=data.quote)
  }


}
