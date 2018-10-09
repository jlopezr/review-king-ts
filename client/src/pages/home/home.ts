import {Component} from "@angular/core";
import {NavController, ModalController} from 'ionic-angular';
import {AddReviewPage} from '../add-review/add-review';
import {Reviews, Review} from '../../providers/reviews/reviews';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  reviews: Review[];

  constructor(public nav: NavController, public reviewService: Reviews, public modalCtrl: ModalController) {
  }

  ionViewDidLoad():void {
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data as Review[];
    });
  }

  addReview():void {
    let modal = this.modalCtrl.create(AddReviewPage);

    modal.onDidDismiss(review => {
      if (review) {
        this.reviews.push(review);
        this.reviewService.createReview(review);
      }
    });

    modal.present();

  }

  deleteReview(review:Review):void {
    //Remove locally
    let index = this.reviews.indexOf(review);

    if (index > -1) {
      this.reviews.splice(index, 1);
    }

    //Remove from database
    this.reviewService.deleteReview(review._id);
  }

}
