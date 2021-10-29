import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastSevicesService {

  constructor() { }

  FireSuccessToast(Title: string, Body: string) {
    Swal.fire(
      Title,
      Body,
      'success'
    )
  }
}
