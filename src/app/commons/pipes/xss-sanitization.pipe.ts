import { PipeTransform, Injectable } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any): any {
    return this.sanitize(value);
  }
  private sanitize(value: any): any {
    if (typeof value === 'string') {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
    } else if (Array.isArray(value)) {
      return value.map(item => this.sanitize(item));
    } else if (typeof value === 'object' && value !== null) {
      const sanitized = {};
      for (const key in value) {
        sanitized[key] = this.sanitize(value[key]);
      }
      return sanitized;
    }
    return value;
  }
}
