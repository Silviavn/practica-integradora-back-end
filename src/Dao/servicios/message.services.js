import * as messageDao from '../Mongo/message.dao' 


const getMessages = async () => {
  const messages = await messageDao.getMessages();

  return messages;
};

const saveMessage = async (message) => {
  const newMessage = await messageDao.saveMessage(message);

  return newMessage;
};

export { getMessages, saveMessage };