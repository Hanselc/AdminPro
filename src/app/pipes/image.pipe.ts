import { Pipe, PipeTransform } from '@angular/core';
import { WEBAPI_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: string = 'user'): any {

    let url = WEBAPI_URL + '/image';

    if (!image) {
      return (url += '/users/noimage');
    }

    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch (type) {
      case 'user':
        url += '/users/' + image;
        break;
      case 'doctor':
        url += '/doctors/' + image;
        break;
      case 'hospital':
        url += '/hospitals/' + image;
        break;
      default:
        console.log('Image type doesn\'t exists');
        break;
    }

    return url;
  }
}
