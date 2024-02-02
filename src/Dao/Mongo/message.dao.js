import messageModel from "../models/messages.model";


const getMessages = async () => {
  const messages = await messageModel.find();
  return messages;
};

const saveMessage = async (message) => {
  const newMessage = await messageModel.create(message);

  return newMessage;
};

export { getMessages, saveMessage };