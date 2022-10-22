const mongoose = require('mongoose');
const slugify = require('slugify');
const Geocoder = require("../Utilities/Geocoder")

const UniversitySchema = new mongoose.Schema({
  shortName: {
    type: String,
    required: [true, 'Please add a name'],
    // unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Please add the full name of the institution'],
    maxlength: [1000, 'full name can not be more than 1000 characters']
  },
  motto: {
    type: String,
    trim: true,
    required: [true, 'Please add the motto of the institution'],
    maxlength: [1000, 'Description can not be more than 1000 characters']
  },
  website: {
    type: String,
    trim: true,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  // category: {
  //   type: [String],
  //   unique: false,
  //   enum: [
  //     "Federal",
  //     "State",
  //     "Private"
  //   ],
  //   required: [true, 'Please add the category of the institution'],
  //   maxlength: [8, 'Category can not be more than 8 characters']
  // },
  // address: {
  //   type: String,
  //   trim: true,
  //   required: [true, 'Please add an address']
  // },
  // location: {
  //   // GeoJSON Point
  //   type: {
  //     type: String,
  //     enum: ['Point']
  //   },
  //   coordinates: {
  //     type: [Number],
  //     index: '2dsphere'
  //   },
  //   formattedAddress: String,
  //   city: String,
  //   state: String,
  //   country: String
  // },
  Vice_Chancellor: {
    type: String,
    required: [true, 'Please add the name of the Vice Chancellor of the institution']
  },
}
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
  // }
);

// Create university slug from the name
UniversitySchema.pre('save', function (next) {
  this.slug = slugify(this.shortName, { lower: true });
  next();
});

// // Geocode & create location field
// UniversitySchema.pre('save', async function(next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress,
//     street: loc[0].streetName,
//     city: loc[0].city,
//     state: loc[0].stateCode,
//     zipcode: loc[0].zipcode,
//     country: loc[0].countryCode
//   };

//   // Do not save address in DB
//   this.address = undefined;
//   next();
// });

// // Cascade delete courses when a university is deleted
// UniversitySchema.pre('remove', async function(next) {
//   console.log(`Courses being removed from The University with this ${this._id}`);
//   await this.model('Course').deleteMany({ university: this._id });
//   next();
// });

// // Reverse populate with virtuals
// UniversitySchema.virtual('courses', {
//   ref: 'Course',
//   localField: '_id',
//   foreignField: 'university',
//   justOne: false
// });

module.exports = mongoose.model('Univerity', UniversitySchema);
