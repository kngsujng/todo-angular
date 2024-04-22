import { Injectable } from '@angular/core';
import { Modal } from '../model/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: Modal = { isOpen: true };

  constructor() {}

  // 모달의 오픈 상태 변경
  toggleModal() {
    if (this.modal) {
      this.modal.isOpen = !this.modal.isOpen;
    }
  }

  getIsOpen(): boolean {
    return !!this.modal.isOpen;
  }
}
