import  { userModel }  from "../models/users.model.js";



const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};

const createUser = async (user) => {
  const newUser = await userModel.create(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email: email });
  return user;
};

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
}; 

const changePassword = async (email, newPassword) => {
  await userModel.findOneAndUpdate({ email: email }, { password: newPassword });
}; 

const changeRole = async (email) => {
  const user = await userModel.findOne({ email: email });
  if (user.role === "user") {
    const resp = await userModel.findOneAndUpdate({ email: email }, { role: "premium" });

    return resp;
  }
  if (user.role === "premium") {
    const resp = await userModel.findOneAndUpdate({ email: email }, { role: "user" });
    return resp;
  }
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
};

const addLastConnection = async (uid, date) => {
  const user = await userModel.findById(uid);
  user.lastConnection = date;
  await user.save();

  return user;
};

const addDatos = async (uid, datos) => {
  const user = await userModel.findById(uid);
  datos.forEach((dato) => {
    let newDocument = {
      name: dato.originalname,
      reference: dato.path,
    };

    user.documents.push(newDocument);
  });

  await user.save();

  return user;
};

const deleteUsers = async () => { 
  const users = await userModel.find({});
  // Eliminamos los usuarios que llevan más de 2 días sin conectarse
  for (const user of users) {
    if (user.lastConnection < new Date(Date.now() - 172800000)) {
      await userModel.findByIdAndDelete(user._id);
    }
  }

  return users;
};

export {
  createUser,
  getUserByEmail,
  getUserById,
  changePassword,
  changeRole,
  getAllUsers,
  deleteUser,
  addLastConnection,
  addDatos,
  deleteUsers,
};