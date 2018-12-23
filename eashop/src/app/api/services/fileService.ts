import {HttpClient} from '@angular/common/http';
import {API_URL} from '../apiConstants';
import {Injectable} from "@angular/core";

@Injectable()
export class FileService {
  constructor(private http: HttpClient) { }

  uploadFile(file) {
    return this.http.post(`${API_URL}/File`, file);
  }

  getFile(name: string) {
    return this.http.get(`${API_URL}/File/${name}`);
  }
}
