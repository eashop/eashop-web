import {HttpClient} from '@angular/common/http';
import {API_URL} from '../apiConstants';
import {Injectable} from "@angular/core";

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient) {
  }

  getCategories(): Promise<any> {
    return this.http.get(`${API_URL}/categories`).toPromise();
  }


}
