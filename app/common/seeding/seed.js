import { ADMIN_ROLE } from "../../../src/modules/users/constants/index.js";
import Users from "../../../src/modules/users/models/index.js";
import { isNil } from "../utilities/index.js";

export const initializeSeeding = async () => {
  // seed super admin if not exist
  const superAdmin = await Users.findOne({ username: 'super-admin' }).lean();
  if (isNil(superAdmin)) {
    await Users.create({
      role: ADMIN_ROLE,
      username: 'super-admin',
      verified: true,
      firstName: 'Super',
      lastName: 'Admin',
      phone: '01111111111',
      email: 'super.admin@tripy.com',
    })
  }
};