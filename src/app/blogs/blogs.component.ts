import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ Router } from '@angular/router'
import { Session } from 'protractor';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  url;
  MainBlog:any[];
  Blogs:any[];
  viewData:any[];


  constructor(
    private _http : HttpClient,
    private routes: Router

  ) 
  { 
    this.url = "https://indianclassicgist.com/PHP/BlogPost.php";
  }

  ngOnInit() {
    this._http.get<any>(this.url).subscribe((data: []) => {

      this.Blogs = data;
      this.MainBlog = data.slice(0,1);
    },err => {
        console.error('There was an error!', err);
  });
    
  }
  getShort(text,scale) { 
    return text.substring(0,scale)+"...";
  }

  SaveBlog(item){
    this.viewData = item; 
    //sessionStorage.setItem("Blog", JSON.stringify(item));
    var keys = Object.keys(item);
    
    for (let key in item) {
      sessionStorage.setItem(key,item[key]);
    }
    this.routes.navigate(['/Bloger'])
  }
 

}
