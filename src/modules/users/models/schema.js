import mongoose from "mongoose";
import { SYSTEM_ROLES } from "../constants/index.js";

const UserSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: SYSTEM_ROLES,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		index: true,
	},

	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
	},

	phone: {
		type: String,
		unique: true,
	},

	email: {
		type: String,
		unique: true,
	},

	rating: {
		type: {
			count: {
				type: Number,
				default: 0,
			},
			earned: {
				type: mongoose.Types.Decimal128,
				default: 0.0,
			},
		},
	},

	verified: {
		type: Boolean,
		default: false,
	},

	avatar: {
		type: String, // url
	},

	address: {
		type: {
			name: {
				type: String,
			},
			location: {
				type: {
					type: String,
					enum: ["Point"],
					required: true,
				},
				coordinates: {
					type: [Number],
					required: true,
				}
			},
		},
	}
});

export default UserSchema;