const bcrypt = require('bcryptjs')
const auth = require('../jwt-auth')

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType
} = require('graphql')

const {
    CoverType,
    TourType,
    HighlightType,
    UserType,
    PackageType,
    BookingType
} = require('./types')

// Mongoose models.

const Cover = require('../models/cover')
const Highlight = require('../models/highlight')
const Tour = require('../models/tour')
const User = require('../models/user')
const Booking = require('../models/booking')
const Package = require('../models/package')


module.exports = new GraphQLObjectType({
	name:'Mutation',
	fields: {
		addCover: {
			type: CoverType,
			args: {
				url: {type: new GraphQLNonNull(GraphQLString)},
				vertical: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve:(parents,args)=>{
				let newCover = new Cover({
					url: args.url,
					vertical: args.vertical,
				})
				return newCover.save()
			}
		},
		updateCover: {
			type: CoverType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
				url: {type: new GraphQLNonNull(GraphQLString)},
				vertical: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve:(parents,args)=>{
				let coverId = {_id: args.id}
				let updateCover = {
					url: args.url,
					vertical: args.vertical,
				}
				return Cover.findOneAndUpdate(coverId, {$set: updateCover}, function(cover){
					 return cover
				})
			}
		},
		deleteCover: {
			type: CoverType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve: (parents, args) => {
				let coverId = {_id: args.id};
				return Cover.findOneAndDelete(coverId)
			}
		},
		addTour: {
			type: TourType,
			args: {
				title: {type: new GraphQLNonNull(GraphQLString)},
				description: {type: new GraphQLNonNull(GraphQLString)},
				price: {type: new GraphQLNonNull(GraphQLFloat)},
				pax: {type: new GraphQLNonNull(GraphQLInt)},
				cid: {type: new GraphQLNonNull(GraphQLString)},
				creatorId: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve:(parents,args)=>{
				let newTour = new Tour({
					title: args.title,
					description: args.description,
					price: args.price,
					pax: args.pax,
					cid: args.cid,
					creatorId: args.creatorId,
				})
				return newTour.save()
			}
		},
		updateTour: {
			type: TourType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
				title: {type: new GraphQLNonNull(GraphQLString)},
				description: {type: new GraphQLNonNull(GraphQLString)},
				price: {type: new GraphQLNonNull(GraphQLFloat)},
				pax: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve:(parents,args)=>{
				let tourId = {_id: args.id}
				let updateTour = {
					title: args.title,
					description: args.description,
					price: args.price,
					pax: args.pax
				}
				return Tour.findOneAndUpdate(tourId, {$set: updateTour}, function(tour){
					 return tour
				})
			}
		},
		publishTour: {
			type: TourType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve:(parents,args)=>{
				let tourId = {_id: args.id}
				let updateTour = {
					isPublished: true,
					isAvailable: true,
				}
				return Tour.findOneAndUpdate(tourId, {$set: updateTour}, function(tour){
					 return tour
				})
			}
		},
		deleteTour: {
			type: TourType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve: (parents, args) => {
				let tourId = {_id: args.id};
				return Tour.findOneAndDelete(tourId)
			}
		},
		addHighlight: {
			type: HighlightType,
			args: {
				tid: {type: new GraphQLNonNull(GraphQLString)},
				description: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve:(parents,args)=>{
				let newHighlight = new Highlight({
					tid: args.tid,
					description: args.description
				})
				return newHighlight.save()
			}
		},
		deleteHighlight: {
			type: HighlightType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve: (parents, args) => {
				let highlightId = {_id: args.id};
				return Highlight.findOneAndDelete(highlightId)
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				let query = User.findOne({ email: args.email })

				return query.then((user) => user).then((user) => {
					if (user == null) { return null }

						let isPasswordMatched = bcrypt.compareSync(args.password, user.password)

						if (isPasswordMatched) {
							user.token = auth.createToken(user.toObject())
							return user
						} else {
							return null
						}
				})
			}
		},
		addUser: {
			type: UserType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				email:{type: new GraphQLNonNull(GraphQLString)},
				password:{type: new GraphQLNonNull(GraphQLString)},
				role:{type: new GraphQLNonNull(GraphQLInt)},
				isApproved:{type: new GraphQLNonNull(GraphQLBoolean)},
			},
			resolve: (parent, args)=> {
				let newUser =  new User({
					name: args.name,
					email: args.email,
					password: bcrypt.hashSync(args.password, 10),
					role: args.role,
					isApproved: args.isApproved,
				})
				return newUser.save().then((user, err) => {
					return (err) ? false : true
				})

			}
		},
		addBooking: {
			type: BookingType,
			args: {
				date: {type: new GraphQLNonNull(GraphQLString)},
				persons: {type: new GraphQLNonNull(GraphQLInt)},
				total: {type: new GraphQLNonNull(GraphQLFloat)},
				pid: {type: new GraphQLNonNull(GraphQLString)},
				tid: {type: new GraphQLNonNull(GraphQLString)},
				uid: {type: new GraphQLNonNull(GraphQLString)},
				isConfirmed: {type: new GraphQLNonNull(GraphQLString)},
				creatorId: {type: new GraphQLNonNull(GraphQLString)},
				reference: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve:(parents,args)=>{
				let newBooking = new Booking({
					tid: args.tid,
					date: args.date,
					persons: args.persons,
					total: args.total,
					pid: args.pid,
					tid: args.tid,
					uid: args.uid,
					reference: args.reference,
					isConfirmed: args.isConfirmed,
					creatorId: args.creatorId,
				})
				return newBooking.save()
			}
		},
		availableTour: {
			type: TourType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve:(parents,args)=>{
				let tourId = {_id: args.id}
				let updateTour = {
					isAvailable: true
				}
				return Tour.findOneAndUpdate(tourId, updateTour, function(tour){
					 return tour
				})
			}
		},
		unavailableTour: {
			type: TourType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve:(parents,args)=>{
				let tourId = {_id: args.id}
				let updateTour = {
					isAvailable: false
				}
				return Tour.findOneAndUpdate(tourId, updateTour, function(tour){
					 return tour
				})
			}
		},
		cancelBooking: {
			type: BookingType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve:(parents,args)=>{
				let bookingId = {_id: args.id}
				let updateBooking = {
					isConfirmed: "Cancelled"
				}
				return Booking.findOneAndUpdate(bookingId, updateBooking, function(booking){
					 return booking
				})
			}
		},
		confirmBooking: {
			type: BookingType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve:(parents,args)=>{
				let bookingId = {_id: args.id}
				let updateBooking = {
					isConfirmed: "Completed"
				}
				return Booking.findOneAndUpdate(bookingId, updateBooking, function(booking){
					 return booking
				})
			}
		},
		addPackage: {
			type: PackageType,
			args: {
				title: {type: new GraphQLNonNull(GraphQLString)},
				price: {type: new GraphQLNonNull(GraphQLFloat)},
				pax: {type: new GraphQLNonNull(GraphQLInt)},
				description: {type: new GraphQLNonNull(GraphQLString)},
				isPublished: {type: new GraphQLNonNull(GraphQLBoolean)},
				cid: {type: new GraphQLNonNull(GraphQLString)},
				url: {type: new GraphQLNonNull(GraphQLString)},
				tid: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve:(parents,args)=>{
				let newPackage = new Package({
					title: args.title,
					price: args.price,
					pax: args.pax,
					description: args.description,
					isPublished: args.isPublished,
					cid: args.cid,
					url: args.url,
					tid: args.tid,
				})
				return newPackage.save()
			}
		},
	}
})