import UserServices from "../services/index.js";

const UsersController = {
  async signupUser(req, res, next) {
    try {
      const user = await UserServices.signup({ ...req.body });
      return res.status(200).send(user);
    }
    catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};

export default UsersController;