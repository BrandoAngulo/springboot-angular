import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';

@Pipe({
  name: 'clienteImage'
})
export class ClienteImagePipe implements PipeTransform {

  transform( cliente: Cliente ): string {

    if ( !cliente.id && !cliente.alt_img ) {
      return 'assets/no-image.png';
    }

    if ( cliente.alt_img ) return cliente.alt_img; // https:///google.com/flash.png

    return `nada`;

  }

}
