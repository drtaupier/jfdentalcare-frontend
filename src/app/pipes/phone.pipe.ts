import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';

    // Remover cualquier carácter que no sea un número
    const phoneNumber = value.replace(/\D/g, '');

    // Aplicar formato
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

    return formattedPhoneNumber;
  }

}
