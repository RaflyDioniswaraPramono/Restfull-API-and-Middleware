import Users from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  const offset = req.query.page;

  try {    
    const users = await Users.findAll({
      offset: offset,
      limit: 10,
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = await req.params.id;

    const userById = await Users.findAll({
      where: {
        id: id,
      },
    });

    res.status(201).json(userById);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { id, email, gender, password, role } = await req.body;

    await Users.create({
      id: id,
      email: email,
      gender: gender,
      password: password,
      role: role,
    });

    res.status(200).json({
      message: `Registration email ${email} succesfull, set role = ${role}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, email, gender, password, role } = await req.body;

    await Users.update(
      {
        email: email,
        gender: gender,
        password: password,
        role: role,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res
      .status(200)
      .json({ message: `Update users with id ${id} successfully!` });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = await req.params.id;

    await Users.destroy({
      where: {
        id: id,
      },
    });

    res.json({ message: `Delete users width id ${id} successfully!` });
  } catch (error) {
    console.log(error);
  }
};
