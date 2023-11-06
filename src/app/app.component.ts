import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef
  title = 'test-pass-strength';
  showPassword: boolean = false;
  passwordStrength: string = 'no-pass'
  password: string = "";

  ngAfterViewInit() {
    this.focusInput()
  }

  focusInput() {
    this.passwordInput.nativeElement.focus();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordChange() {
    const hasLetters = /[a-zA-Z]/.test(this.password)
    const hasDigits = /[0-9]/.test(this.password)
    const hasSymbols = /[!@#$%^&*()_+[\]{}|;':",./<>?\\~`]/.test(this.password);
    if (this.password === "") {
      this.passwordStrength = 'no-pass'
      return;
    }
    if (this.password.length < 8) {
      this.passwordStrength = 'less-than-eight'
      return;
    }

    if (hasLetters && hasDigits && hasSymbols){
      this.passwordStrength = 'strong'
      return;
    }

    if (
      hasLetters && hasDigits ||
      hasLetters && hasSymbols ||
      hasDigits && hasSymbols
    ) {
      this.passwordStrength = 'middle'
      return;
    }

    if (hasLetters || hasDigits || hasSymbols) {
      this.passwordStrength = 'easy'
    }

  }

  attachAppropriateClass(section: number) {
    if (this.passwordStrength === 'no-pass') return 'gray';
    if (this.passwordStrength === 'less-than-eight') return  'red'
    if (section === 1 && this.passwordStrength === 'easy') return 'red';
    if (section <= 2 && this.passwordStrength === 'middle') return 'yellow';
    if (section <= 3 && this.passwordStrength === 'strong') return 'green'

    return 'gray';
  }
}
