import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';  
import{ Router } from '@angular/router' 

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  public RegisterForm: FormGroup;
  public errorMsg: string;
  public isFormSubmitted: boolean;
  url;
  phoneNumber = "/(7|8|9)\d{9}/";
  

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private tostr : ToastrService,
    private routes: Router
   
  ) {
    this.url = "https://indianclassicgist.com/PHP/ContactMail.php";
   }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.required]],
      Phone: ['', [Validators.required, Validators.required]],
      Query: ['', [Validators.required, Validators.required]],

    });

  }

  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      setTimeout(function() { alert("only digits allowed"); }, 1);
    }
  }

  public sendQuery(formValue: any, isValid: boolean): void {
    this.errorMsg = '';
    this.isFormSubmitted = true;
    console.log(this.RegisterForm.value);
    this.http.post(this.url , JSON.stringify(this.RegisterForm.value)).subscribe((res:any)=>{
      alert("successfully registered,we will contact you soon");
      this.RegisterForm.reset();
  },
  err=>{
    
    if(err.status==404){
     
      console.log(err);
      
    }
    else if(err.status==200){
      alert("successfully registered,we will contact you soon");

      this.RegisterForm.reset();
      this.routes.navigate(['home'])
    }
    else{
      this.tostr.error("Error Occures from the DB" , 'Error'); 
      console.error(err);
    }
  
     })



  }


}
