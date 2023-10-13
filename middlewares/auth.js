import Users from "../models/Users.js";

export const auth = async (req, res, next) => {
  try {
    const user = await Users.findAll({
      where: {
        email: await req.query.email,
      },
    });

    if (user[0].role !== "Project Manager") {
      return res
        .status(401)
        .json({ message: "Unauthorized, Project Manager Only!" });
    }

    next();
  } catch (error) {
    res
      .status(404)
      .json({ message: "You must logged in first as Project Manager!" });
  }
};
