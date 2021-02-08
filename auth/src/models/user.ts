import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that described the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// trick to help typescript + mongoose work together
// this is how we add a function to a schema in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// middleware function implemented in mongoose
userSchema.pre('save', async function (done) {
  // first time of creating a user with a password, it considered modified
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// the <> is generic sytax of typescript:
// types been provided to a function as arguments
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
