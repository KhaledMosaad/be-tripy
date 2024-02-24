import jwt from "jsonwebtoken";
import Users from "../models/index.js";
import bcrypt from 'bcrypt';
import { COMMUTER_ROLE } from "../constants/roles.js";
import envs from "../../../../app/config.js";
import { isNil } from "../../../../app/common/utilities/index.js";

const UserServices = {
  async signup({ username, password, firstName, lastName, phone, email }) {
    // validate unique values
    const [emailExist, phoneExist, usernameExist] = await Promise.all([
      Users.exists({ email }),
      Users.exists({ phone }),
      Users.exists({ username }),
    ]);

    // throw a clear error
    if (!isNil(emailExist)) {
      throw new Error('User email used before');
    }

    if (!isNil(phoneExist)) {
      throw new Error('User phone used before');
    }

    if (!isNil(usernameExist)) {
      throw new Error('User username used before');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // User creation
    let user = await Users.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      email,
      // the default role for any user admin can promote him by another endpoint
      role: COMMUTER_ROLE,
    });
    user = user.toJSON();
    // remove user password from payload and returned response
    delete user.password;
    return { user };
  },
};

export default UserServices;