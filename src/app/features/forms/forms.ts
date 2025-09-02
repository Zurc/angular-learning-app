import { Component, signal, computed } from '@angular/core';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  options?: string[];
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isValid: boolean;
}

@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms {
  // Signal-based form controls
  public username = signal('');
  public email = signal('');
  public rating = signal(0);
  public tags = signal<string[]>([]);
  public validationEnabled = signal(true);
  public usernameValid = signal(true);
  public emailValid = signal(true);

  // Dynamic form builder
  public formFields = signal<FormField[]>([]);
  public formData = signal<Record<string, any>>({});

  // Real-time validation
  public password = signal('');
  public confirmPassword = signal('');
  public showPasswordRequirements = signal(true);

  // Computed values
  public isFormValid = computed(() => {
    if (!this.validationEnabled()) return true;
    return this.isUsernameValid() && this.isEmailValid() && this.username().length > 0 && this.email().length > 0;
  });

  public isUsernameValid = computed(() => {
    const username = this.username();
    return username.length >= 3;
  });

  public isEmailValid = computed(() => {
    const email = this.email();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length === 0 || emailRegex.test(email);
  });

  public starArray = computed(() => {
    return Array(5).fill(0);
  });

  public passwordValidation = computed((): PasswordValidation => {
    const pwd = this.password();
    const validation = {
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[!@#$%^&*]/.test(pwd),
      isValid: false
    };
    
    validation.isValid = validation.minLength && 
                        validation.hasUppercase && 
                        validation.hasLowercase && 
                        validation.hasNumber && 
                        validation.hasSpecial;
    
    return validation;
  });

  public passwordsMatch = computed(() => {
    return this.password() === this.confirmPassword() && 
           this.password().length > 0;
  });

  private fieldCounter = 0;

  constructor() {
    // Initialize with some demo fields
    this.addFormField();
  }

  // Signal-based form methods
  public resetForm() {
    this.username.set('');
    this.email.set('');
    this.rating.set(0);
    this.tags.set([]);
    this.usernameValid.set(true);
    this.emailValid.set(true);
  }

  public fillSampleData() {
    this.username.set('john_doe');
    this.email.set('john@example.com');
    this.rating.set(4);
    this.tags.set(['angular', 'typescript', 'forms']);
  }

  public toggleValidation() {
    this.validationEnabled.update(enabled => !enabled);
  }

  // Dynamic form builder methods
  public addFormField() {
    const fieldTypes: FormField['type'][] = ['text', 'number', 'select', 'checkbox'];
    const randomType = fieldTypes[Math.floor(Math.random() * fieldTypes.length)];
    
    let newField: FormField = {
      id: `field_${++this.fieldCounter}_${Date.now()}`,
      type: randomType,
      label: `Field ${this.fieldCounter}`,
      placeholder: `Enter ${randomType} value`
    };

    // Add options for select fields
    if (randomType === 'select') {
      newField.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    } else if (randomType === 'checkbox') {
      newField.placeholder = 'Check this option';
    }
    
    this.formFields.update(fields => [...fields, newField]);
    
    // Initialize field value
    this.formData.update(data => ({
      ...data,
      [newField.id]: randomType === 'checkbox' ? 'false' : ''
    }));
  }

  public removeLastField() {
    const fields = this.formFields();
    if (fields.length === 0) return;
    
    const lastField = fields[fields.length - 1];
    this.formFields.update(fields => fields.slice(0, -1));
    
    // Remove from form data
    this.formData.update(data => {
      const newData = { ...data };
      delete newData[lastField.id];
      return newData;
    });
  }

  public removeFormField(fieldId: string) {
    this.formFields.update(fields => fields.filter(f => f.id !== fieldId));
    this.formData.update(data => {
      const newData = { ...data };
      delete newData[fieldId];
      return newData;
    });
  }

  public clearFormBuilder() {
    this.formFields.set([]);
    this.formData.set({});
    this.fieldCounter = 0;
  }

  public getFieldValue(fieldId: string): string {
    return this.formData()[fieldId] || '';
  }

  public updateFieldValue(fieldId: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    let value: string;

    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked ? 'true' : 'false';
    } else {
      value = target.value;
    }

    this.formData.update(data => ({
      ...data,
      [fieldId]: value
    }));
  }

  public getFormDataJson(): string {
    const data = this.formData();
    return JSON.stringify(data, null, 2);
  }

  // Signal-based form control methods
  public updateUsername(event: Event) {
    const target = event.target as HTMLInputElement;
    this.username.set(target.value);
  }

  public updateEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
  }

  public setRating(rating: number) {
    this.rating.set(rating);
  }

  public addTag(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue && !this.tags().includes(trimmedValue)) {
      this.tags.update(tags => [...tags, trimmedValue]);
    }
  }

  public removeTag(tagToRemove: string) {
    this.tags.update(tags => tags.filter(tag => tag !== tagToRemove));
  }

  public handleTagInput(event: KeyboardEvent, input: HTMLInputElement) {
    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault();
      const value = input.value.replace(',', '').trim();
      if (value) {
        this.addTag(value);
        input.value = '';
      }
    }
  }

  // Real-time validation methods
  public togglePasswordRequirements() {
    this.showPasswordRequirements.update(show => !show);
  }

  public clearValidationForm() {
    this.password.set('');
    this.confirmPassword.set('');
  }
}
