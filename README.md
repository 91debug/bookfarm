# bookfarm
## Model
### User
```
{
  createdTime: Date,
  studentId: Number,
  password: String,
  username: String,
}
```
### Sell
```
{
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  buyers: [User],
  createdTime: Date,
  price: {
    type: Number,
    required: true,
  },
}
```
### Book
```
{
  createdTime: Date,
  isbn: String,
  title: String,
  author: String,
}
```
## API
### User
### Sell
### Book