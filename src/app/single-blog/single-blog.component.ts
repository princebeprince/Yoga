import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  data ={
    img1:'',
    Title:'',
    Blog:'',
    BID:'',
    img4:'',
    SubTitle2:'',
    Sub3Content:'',
    date:'',
    SubTitle3:'',
    img2:'',
    img3:'',
    Sub1Content:'',
    is_cancelled:'',
    SubTitle1:'',
    youtubeLink:''

  }

  constructor(
    private _http : HttpClient,
    private routes: Router,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // var keys = Object.keys(sessionStorage);
    // for (let key in keys) {
    //   console.log(key)
    //   this.data[key] = sessionStorage.getItem(key);
    // }
    // console.log(this.data)


    for(var i=0, len=sessionStorage.length; i<len; i++) {
      var key = sessionStorage.key(i);
      var value = sessionStorage[key];
      this.data[key] = value;
  }
  console.log(this.data)
  }

  VideoSanitizer(url){
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
