import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ECommerceStore } from '../../e-commerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconButton, MatIcon, MatFormField, MatInput, MatPrefix, MatSuffix, MatButton, MatDialogModule, ReactiveFormsModule],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  store = inject(ECommerceStore);
  matDialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);
  signUpForm = this.fb.group({
    name: ['John Doe', Validators.required],
    email: ['elico@ltd.com', Validators.required],
    password: ['Elico@123', Validators.required],  
    confirmPassword: ['Elico@123', Validators.required],  
  });
  signUp() {
    if (!this.signUpForm.valid) {
        this.signUpForm.markAllAsTouched();
        return;
      }
      const { name, email, password } = this.signUpForm.value; 
      this.store.SignUp({name, email, password, dialogId: this.dialogRef.id} as SignUpParams);
  }
  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: { 
        checkout: this.data.checkout,
      }
    });
  }
}
