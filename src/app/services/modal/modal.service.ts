import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Modal } from '../../model/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: Modal;

  constructor() { }

}
