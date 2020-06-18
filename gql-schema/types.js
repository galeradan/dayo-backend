const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull
} = require('graphql')
const {GraphQLDateTime} = require('graphql-iso-date')

const Cover = require('../models/cover')
const Highlight = require('../models/highlight')
const Tour = require('../models/tour')
const User = require('../models/user')
const Booking = require('../models/booking')
const Package = require('../models/package')

const CoverType = new GraphQLObjectType({
	name: "Cover",
	fields: () => ({
		id: {type: GraphQLID},
		url: {type: GraphQLString},
		vertical: {type: GraphQLInt},
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
	}) 
})

const TourType = new GraphQLObjectType({
	name: "Tour",
	fields: () => ({
		id: {type: GraphQLID},
		title: {type: GraphQLString},
		price: {type: GraphQLFloat},
		pax: {type: GraphQLInt},
		description: {type: GraphQLString},
		cid: {type: GraphQLString},
		creatorId: {type: GraphQLString},
		isPublished: {type: GraphQLBoolean},
		isAvailable: {type: GraphQLBoolean},
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
		cover: {
			type: CoverType,
			resolve: (parent,args)=>{
				return Cover.findById(parent.cid);
			}
		},
		creator: {
			type: UserType,
			resolve: (parent,args)=>{
				return User.findById(parent.creatorId);
			}
		},
		highlights: {
			type: new GraphQLList(HighlightType),
			resolve: (parent,args)=>{
				return Highlight.find({tid: parent.id});
			}
		}

	}) 
})

const HighlightType = new GraphQLObjectType({
	name: "Highlight",
	fields: () => ({
		id: {type: GraphQLID},
		description: {type: GraphQLString},
		tid: {type: GraphQLString},
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
	}) 
})

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		password: {type: GraphQLString},
		role: {type: GraphQLInt},
		isApproved: {type: GraphQLBoolean},
		token: { type: GraphQLString },
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
	}) 
})


const PackageType = new GraphQLObjectType({
	name: "Package",
	fields: () => ({
		id: {type: GraphQLID},
		title: {type: GraphQLString},
		price: {type: GraphQLFloat},
		pax: {type: GraphQLInt},
		description: {type: GraphQLString},
		isPublished: {type: GraphQLBoolean},
		cid: {type: GraphQLString},
		url: {type: GraphQLString},
		creatorId: {type: GraphQLString},
		tid: {type: GraphQLString},
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
		bookings: {
			type: new GraphQLList(HighlightType),
			resolve: (parent,args)=>{
				return Booking.find({pid: parent.id});
			}
		},
		cover: {
			type: CoverType,
			resolve: (parent,args)=>{
				return Cover.findById(parent.cid);
			}
		}
	}) 
})

const BookingType = new GraphQLObjectType({
	name: "Booking",
	fields: () => ({
		id: {type: GraphQLID},
		date: {type: GraphQLString},
		reference: {type: GraphQLString},
		persons: {type: GraphQLInt},
		total: {type: GraphQLFloat},
		isConfirmed: {type: GraphQLString},
		pid: {type: GraphQLString},
		tid: {type: GraphQLString},
		uid: {type: GraphQLString},
		creatorId: {type: GraphQLString},
		createdAt: {type: GraphQLDateTime},
		updatedAt: {type: GraphQLDateTime},
		package: {
			type: PackageType,
			resolve: (parent,args)=>{
				return Package.findById(parent.pid);
			}
		},
		user: {
			type: UserType,
			resolve: (parent,args)=>{
				return User.findById(parent.uid);
			}
		}
	}) 
})


module.exports = {
	TourType,
	CoverType,
	HighlightType,
	UserType,
	PackageType,
	BookingType
}