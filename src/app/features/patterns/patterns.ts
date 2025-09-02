import { Component, signal, computed } from '@angular/core';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

interface SkeletonItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-patterns',
  imports: [],
  templateUrl: './patterns.html',
  styleUrl: './patterns.scss',
})
export class Patterns {
  // Skeleton Loading State
  public isLoading = signal(false);
  public skeletonItems = signal<SkeletonItem[]>([]);
  
  // Toast Notification System
  public toasts = signal<ToastMessage[]>([]);
  private toastId = 0;
  
  // Cooldown Button State
  public cooldownActive = signal(false);
  public cooldownTime = signal(0);
  public cooldownInterval: any = null;
  
  // Loading Button States
  public saveLoading = signal(false);
  public uploadLoading = signal(false);
  public deleteLoading = signal(false);
  
  // Error Handling States
  public hasError = signal(false);
  public errorMessage = signal('');
  
  // Progress Bar State
  public uploadProgress = signal(0);
  public isUploading = signal(false);
  
  // Computed values
  public cooldownProgress = computed(() => {
    const maxTime = 5; // 5 seconds
    return ((maxTime - this.cooldownTime()) / maxTime) * 100;
  });

  constructor() {
    this.loadInitialData();
  }

  // Skeleton Loading Methods
  public toggleLoading() {
    if (this.isLoading()) {
      this.stopLoading();
    } else {
      this.startLoading();
    }
  }

  public startLoading() {
    this.isLoading.set(true);
    this.skeletonItems.set([]);
    
    // Simulate loading delay
    setTimeout(() => {
      this.stopLoading();
    }, 3000);
  }

  public stopLoading() {
    this.isLoading.set(false);
    this.loadInitialData();
  }

  private loadInitialData() {
    const items: SkeletonItem[] = [
      {
        id: 1,
        title: 'Advanced Angular Patterns',
        description: 'Learn about signals, standalone components, and modern Angular architecture patterns for building scalable applications.',
        image: '🚀'
      },
      {
        id: 2,
        title: 'State Management with Signals',
        description: 'Explore reactive programming with Angular signals and how they simplify state management in complex applications.',
        image: '📡'
      },
      {
        id: 3,
        title: 'Component Communication',
        description: 'Master parent-child communication, ViewChild, content projection, and advanced component interaction patterns.',
        image: '🔗'
      }
    ];
    this.skeletonItems.set(items);
  }

  // Toast Notification Methods
  public showSuccessToast() {
    this.addToast('Operation completed successfully!', 'success');
  }

  public showErrorToast() {
    this.addToast('Something went wrong. Please try again.', 'error');
  }

  public showInfoToast() {
    this.addToast('Here is some helpful information for you.', 'info');
  }

  public showWarningToast() {
    this.addToast('Please review your input before proceeding.', 'warning');
  }

  public addToast(message: string, type: ToastMessage['type'], duration: number = 4000) {
    const toast: ToastMessage = {
      id: ++this.toastId,
      message,
      type,
      duration
    };

    this.toasts.update(toasts => [...toasts, toast]);

    // Auto-remove after duration
    setTimeout(() => {
      this.removeToast(toast.id);
    }, duration);
  }

  public removeToast(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  public clearAllToasts() {
    this.toasts.set([]);
  }

  // Cooldown Button Methods
  public triggerCooldown() {
    if (this.cooldownActive()) return;

    this.addToast('Action executed! Cooldown started.', 'info', 2000);
    this.cooldownActive.set(true);
    this.cooldownTime.set(5);

    this.cooldownInterval = setInterval(() => {
      const currentTime = this.cooldownTime();
      if (currentTime <= 1) {
        this.cooldownActive.set(false);
        this.cooldownTime.set(0);
        clearInterval(this.cooldownInterval);
        this.addToast('Cooldown complete! Ready to use again.', 'success', 2000);
      } else {
        this.cooldownTime.set(currentTime - 1);
      }
    }, 1000);
  }

  // Loading Button Methods
  public simulateSave() {
    this.saveLoading.set(true);
    setTimeout(() => {
      this.saveLoading.set(false);
      this.addToast('Data saved successfully!', 'success');
    }, 2000);
  }

  public simulateUpload() {
    this.uploadLoading.set(true);
    this.isUploading.set(true);
    this.uploadProgress.set(0);

    const interval = setInterval(() => {
      const progress = this.uploadProgress();
      if (progress >= 100) {
        clearInterval(interval);
        this.uploadLoading.set(false);
        this.isUploading.set(false);
        this.addToast('File uploaded successfully!', 'success');
      } else {
        this.uploadProgress.set(progress + Math.random() * 15);
      }
    }, 200);
  }

  public simulateDelete() {
    this.deleteLoading.set(true);
    setTimeout(() => {
      this.deleteLoading.set(false);
      this.addToast('Item deleted successfully!', 'success');
    }, 1500);
  }

  // Error Handling Methods
  public simulateError() {
    this.hasError.set(true);
    this.errorMessage.set('Failed to connect to the server. Please check your internet connection and try again.');
  }

  public clearError() {
    this.hasError.set(false);
    this.errorMessage.set('');
  }

  public retryOperation() {
    this.clearError();
    this.addToast('Retrying operation...', 'info', 2000);
    
    // Simulate retry
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      if (success) {
        this.addToast('Operation completed successfully!', 'success');
      } else {
        this.simulateError();
      }
    }, 1500);
  }
}
