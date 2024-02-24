import mongoose from "mongoose";
import UserSchema from "./schema.js";
import { COLLECTION_NAME, MODEL_NAME } from "./constant.js";

const Users = mongoose.model(MODEL_NAME, UserSchema, COLLECTION_NAME);

export default Users;