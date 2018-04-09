import { Document, Schema, Model, model} from "mongoose";
import { IReview } from "../interfaces/review";

export interface IReviewModel extends IReview, Document {
}

export var ReviewSchema: Schema = new Schema({
    title: String,
    description: String,
    rating: Number
});

export const Review: Model<IReviewModel> = model<IReviewModel>("Review", ReviewSchema);