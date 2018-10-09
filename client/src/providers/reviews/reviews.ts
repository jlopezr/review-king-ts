import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface Review {
  title: string;
  description: string;
  rating: number;
}

@Injectable()
export class Reviews {

  data: Review[];

  constructor(public http: HttpClient) {
    this.data = null;
  }

  getReviews():Promise<Review[]> {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/reviews')
        .subscribe(data => {
          this.data = data as Review[];
          resolve(this.data);
        });
    });
  }

  createReview(review:Review):void {

    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res);
      });

  }

  deleteReview(id:number):void{

    this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
      console.log(res);
    });

  }
}
