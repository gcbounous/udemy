import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('f', {static:true}) signUpForm: NgForm;
    
    defaultSecret = 'pet';
    answer = '';
    genders = ['male', 'female'];
    user = {
        name: '',
        email: '',
        question: '',
        answer: '',
        gender: ''
    }
    submitted = false;


  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //     userData: {
    //         username: suggestedName,
    //         email: ''
    //     },
    //     secret: 'pet',
    //     questionAnswer: '',
    //     gender: 'male'
    // });
    this.signUpForm.form.patchValue({
        userData: { username: suggestedName }
    });
  }

//   onSubmit(form: NgForm) {
//       console.log(form.form);
//   }

  onSubmit() {
      this.submitted = true;
      this.user.name = this.signUpForm.value.userData.username;
      this.user.email = this.signUpForm.value.userData.email;
      this.user.question = this.signUpForm.value.secret;
      this.user.answer = this.signUpForm.value.questionAnswer;
      this.user.gender = this.signUpForm.value.gender;

      this.signUpForm.reset();
  }
}