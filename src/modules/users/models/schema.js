import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		index: true,
	},

	displayName: {
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