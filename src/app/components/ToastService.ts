import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'any',
})
export class ToastsService {
  toasts: any[] = [];

  constructor(private router: Router, private messageService: MessageService) {}

  show(options: any) {
    this.messageService.add(options);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  removeAll() {
    this.messageService.clear();
    this.toasts = [];
  }

  onClick(toast: any) {
    if (toast.url) {
      this.router.navigateByUrl(toast.url).then((promise) => promise);
    }
    this.messageService.clear();
  }

  alert(options: any) {
    const allOptions = Object.assign(
      {
        classname: 'text-warning pointer',
        icon: 'fa fa-exclamation-triangle fa-lg text-warning p-1',
        severity: 'warning',
        life: 5000,
      },
      options,
    );
    this.show(allOptions);
  }

  info(options: any) {
    const allOptions = Object.assign(
      {
        classname: 'text-info pointer',
        icon: 'fa fa-info-circle fa-lg text-info p-1',
        severity: 'info',
        life: 5000,
      },
      options,
    );
    this.show(allOptions);
  }

  success(options: any) {
    const allOptions = Object.assign(
      {
        classname: 'text-success',
        icon: 'fa fa-check-circle fa-lg text-success p-1',
        severity: 'success',
        life: 5000,
      },
      options,
    );
    this.show(allOptions);
  }

  error(options: any) {
    const allOptions = Object.assign(
      {
        classname: 'text-danger pointer',
        icon: 'fa fa-times-circle fa-lg text-danger p-1',
        severity: 'error',
        life: 5000,
      },
      options,
    );
    this.show(allOptions);
  }
}
