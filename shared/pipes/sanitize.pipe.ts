import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * SanitizePipe recorre recursivamente un objeto y escapa caracteres
 * potencialmente peligrosos en las cadenas de texto. Su objetivo es
 * mitigar ataques de inyección de scripts (XSS) y otros vectores de
 * inyección de datos. Al aplicarse como pipe global, sanitiza todas
 * las entradas recibidas por los controladores.
 */
@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any): any {
    return this.deepSanitize(value);
  }

  private deepSanitize(input: any): any {
    if (typeof input === 'string') {
      return this.escapeString(input);
    }
    if (Array.isArray(input)) {
      return input.map((item) => this.deepSanitize(item));
    }
    if (input && typeof input === 'object') {
      const sanitized: any = {};
      for (const key of Object.keys(input)) {
        sanitized[key] = this.deepSanitize(input[key]);
      }
      return sanitized;
    }
    return input;
  }

  /**
   * Escapa caracteres especiales en una cadena para evitar XSS.
   * Reemplaza los caracteres <, >, &, ', " por sus equivalentes HTML.
   */
  private escapeString(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
}