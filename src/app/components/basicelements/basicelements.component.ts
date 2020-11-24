import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ Router } from '@angular/router'
 

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
  header = new HttpHeaders ({'Content-Type' : 'application/json','Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',})
  
   
    simpleSlider = 40;
    doubleSlider = [20, 60];
    state_default: boolean = true;
    focus: any;
    Blogs:any[];
    viewData=[];
    url;
    meeturl;
    
    data =[
      {
        "name": "Type1",
        "Dir": "assets/img/gallery/1-min.jpg"
    },
    {
      "name": "Type1",
      "Dir": "assets/img/gallery/2-min.JPG"
    },
    {
      "name": "Type1",
      "Dir": "assets/img/gallery/3-min.jpg"
    },{
      "name": "Type1",
      "Dir": "assets/img/gallery/4-min.jpg"
  },
  {
    "name": "Type1",
    "Dir": "assets/img/gallery/5-min.jpg"
  },
  {
    "name": "Type1",
    "Dir": "assets/img/gallery/6-min.jpg"
  }, {
    "name": "Type1",
    "Dir": "assets/img/gallery/7-min.jpg"
},
{
  "name": "Type1",
  "Dir": "assets/img/gallery/8-min.jpg"
},
{
  "name": "Type1",
  "Dir": "assets/img/gallery/9-min.jpg"
},{
  "name": "Type1",
  "Dir": "assets/img/gallery/10-min.JPG"
},
{
"name": "Type1",
"Dir": "assets/img/gallery/11-min.jpg"
},
{
  "name": "Type1",
  "Dir": "assets/img/gallery/12-min.JPG"
  },

    ];


    options = {responseType: 'text' as 'json'};
    constructor(
      private _http : HttpClient,
      private routes: Router
  
    ) 
    { 
      this.url = "https://indianclassicgist.com/PHP/BlogPost.php";
      this.meeturl ="https://indianclassicgist.com/PHP/GMeet.php";
    }

    ngOnInit() {
      this._http.get<any>(this.url).subscribe((data: []) => {
        this.Blogs = data.slice(0,3);
      },err => {
         
          console.error('There was an error!', err);
        
    });
      
    }
    getShort(text) { 
      return text.substring(0,158)+"...";
    }

    openviewer(item){
      this.viewData = item; 
      console.log(item);
      document.getElementById('gallery').style.display = 'none'
      document.getElementById('viewer').style.display = 'inline'
    }
    closeViewer(){
      document.getElementById('gallery').style.display = 'inline'
      document.getElementById('viewer').style.display = 'none'
    }

    sendData(){
      var postData= {
                name : (<HTMLInputElement>document.getElementById('Name')).value,
                meet : (<HTMLInputElement>document.getElementById('meet')).value
        }
    if (postData['name'].length <1){
      alert("Name is Required");
    }
    else{
          if (postData['meet'].length <1){
            alert("Google meet ID is Required");
          }
          else{
            this._http.post(this.meeturl , JSON.stringify(postData)).subscribe((res:any)=>{
              alert("successfully sent ,we will contact you soon");
              
          },
          err=>{
            
            if(err.status==404){
             
              console.log(err);
              
            }
            else if(err.status==200){
              alert("successfully sent ,we will contact you soon");
              (<HTMLInputElement>document.getElementById('Name')).value='';
              (<HTMLInputElement>document.getElementById('meet')).value='';
              

            }
            else{
              console.error(err);
            }
          
             })
        
              }
        }



    }

}
