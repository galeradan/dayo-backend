const {
    GraphQLString,
    GraphQLID,
    GraphQLList,
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


// Query declaration and expor

module.exports = new GraphQLObjectType({
	name: 'Query',
	fields: {
		covers: {
		    type: new GraphQLList(CoverType),
		    resolve: (parent, args) => {
		        return Cover.find({})
		    }
		},
		cover: {
			type: CoverType,
			args: {
				id: {type: GraphQLID}
			},
			resolve: (parents, args) =>{
				return Cover.findById(args.id)
			}
		},
		tours: {
		    type: new GraphQLList(TourType),
		    resolve: (parent, args) => {
		        return Tour.find({})
		    }
		},
		publishedTours: {
		    type: new GraphQLList(TourType),
		    resolve: (parent, args) => {
		    	let isPublished = {isPublished: true, isAvailable: true}
		        return Tour.find(isPublished)
		    }
		},
		tour: {
			type: TourType,
			args: {
				id: {type: GraphQLID}
			},
			resolve: (parents, args) =>{
				let tid = args.id
				return Tour.findById(tid)
			}
		},
		creatorTours: {
		    type: new GraphQLList(TourType),
		    args: {
				creatorId: {type: GraphQLString}
			},
		    resolve: (parent, args) => {
		    	let creatorTours = {creatorId: args.creatorId}
		        return Tour.find(creatorTours)
		    }
		},
		highlights: {
		    type: new GraphQLList(HighlightType),
		    resolve: (parent, args) => {
		        return Highlight.find({})
		    }
		},
		userBookings: {
			type: new GraphQLList(BookingType),
		    args: {
				uid: {type: GraphQLString}
			},
		    resolve: (parent, args) => {
		    	let userBookings = {uid: args.uid}
		        return Booking.find(userBookings)
		    }
		}, 
		bookings: {
			type: new GraphQLList(BookingType),
		    args: {
				creatorId: {type: GraphQLString}
			},
		    resolve: (parent, args) => {
		    	let bookings = {creatorId: args.creatorId}
		        return Booking.find(bookings)
		    }
		}, 
	}
})