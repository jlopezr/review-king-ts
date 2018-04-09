import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class Reviews {

  data: any;

  constructor(public http: HttpClient) {
    this.data = null;
  }

  getReviews() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/reviews')
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  createReview(review){

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res);
      });

  }

  deleteReview(id){

    this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
      console.log(res);
    });

  }
}
