import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
    @prop()
    name?: string;

    @prop()
    surname?: string;
}

export const model = new User().getModelForClass(User);
