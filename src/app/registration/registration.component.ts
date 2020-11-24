import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';  
import{ Router } from '@angular/router' 


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public RegisterForm: FormGroup;
  public errorMsg: string;
  public isFormSubmitted: boolean;
  url;
  phoneNumber = "/(7|8|9)\d{9}/";
  Countries:any[];
  selectedCountry = {"Country":"India","Code":"91"};





  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private tostr : ToastrService,
    private routes: Router
   
  ) {
    this.url = "https://indianclassicgist.com/PHP/RegData.php";
   }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.required]],
      Class: ['', [Validators.required, Validators.required]],
      Dob: ['', [Validators.required, Validators.required]],
      Sex: ['', [Validators.required, Validators.required]],
      Guardian: ['', [Validators.required, Validators.required]],
      Occupation: ['', [Validators.required, Validators.required]],
      Phone: ['', [Validators.required,  Validators.pattern("[0-9]{0-10}")]],
      WPhone: ['', [Validators.required,  Validators.pattern("[0-9]{0-10}")]],
      Email: ['', [Validators.required, Validators.required]],
      Address: ['', [Validators.required, Validators.required]],
      Course: ['', [Validators.required, Validators.required]],
      DanceDetails: ['', []],
      TC: ['', [Validators.required, Validators.required]],

    });

    this.http.get<any>("assets/Countries.json").subscribe((data: []) => {
      
      this.Countries = data;
    },err => {
        console.error('There was an error!', err);
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
  selectCountry(item){
    this.selectedCountry = item;
  }
  

 
  
  public login(formValue: any, isValid: boolean): void {

    console.log(this.Countries);
    
    this.errorMsg = '';
    this.isFormSubmitted = true;
    this.RegisterForm.value.Dob = this.RegisterForm.value.Dob.day + '-'+this.RegisterForm.value.Dob.month +'-'+this.RegisterForm.value.Dob.year;
    this.RegisterForm.value.Phone = '+'+this.selectedCountry.Code +'-'+this.RegisterForm.value.Phone 
    alert(this.RegisterForm.value.Phone)
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
