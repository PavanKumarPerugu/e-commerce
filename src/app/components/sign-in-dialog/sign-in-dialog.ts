import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSuffix } from "@angular/material/form-field";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SignInParams } from '../../models/user';
import { ECommerceStore } from '../../e-commerce-store';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatFormField, MatInput, MatSuffix, MatPrefix, MatButton, MatDialogModule, ReactiveFormsModule],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(ECommerceStore);
  data = inject<{ chackout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  passwordVisible = signal(false);
  signInForm = this.fb.group({
    email: ['elico@ltd.com', Validators.required],
    password: ['Elico@123', Validators.required],  
  });
  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;
    console.log('Signing in with', { email });
    this.store.signIn({email, password, checkout: this.data.chackout, dialogId: this.dialogRef.id } as SignInParams);
  }
}
