import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { Modal } from '../model/modal/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modal: Modal;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
