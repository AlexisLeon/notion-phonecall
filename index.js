const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json());

const CHAT_ROOMS = [];

const serializeRooms = (room) => ({
  id: room.id,
  roomName: room.roomName,
  users: [...room.users],
  messages: room.messages,
});

// create a chatroom
// - name
// userID owner
app.post('/chatrooms', (req, res) => {
  console.log(req.body);

  const newChatroom = {
    id: CHAT_ROOMS.length,
    roomName: req.body.roomName,
    users: new Set(),
    messages: [], // { username, message }
  };

  CHAT_ROOMS.push(newChatroom);
  res.json(serializeRooms(newChatroom));
})

app.get('/chatrooms', (req, res) => {
  res.json(CHAT_ROOMS.map(serializeRooms));
})

app.post('/chatrooms/:roomId/join', (req, res) => {
  const {roomId} = req.params;
  const {username} = req.body;

  const room = getRoomById(roomId);
  if (!room) {
    res.status(400).json({
      error: {
        message: `No room with ID ${roomId}`
      }
    });

    return
  }

  room.users.add(username);

  console.log([...room.users]);

  res.send({
    roomId,
    username,
  })
})

app.post('/chatrooms/:roomId/leave', (req, res) => {
  const {roomId} = req.params;
  const {username} = req.body;

  const room = getRoomById(roomId);
  if (!room) {
    res.status(400).json({
      error: {
        message: `No room with ID ${roomId}`
      }
    });

    return
  }

  room.users.delete(username);

  console.log([...room.users]);

  res.send({
    left: true,
    roomId,
    username,
  })
})

app.get('/chatrooms/:roomId/messages', (req, res) => {
  const {roomId} = req.params;

  const room = getRoomById(roomId);
  if (!room) {
    res.status(400).json({
      error: {
        message: `No room with ID ${roomId}`
      }
    });
    return
  }

  res.json(room.messages)
})

app.post('/chatrooms/:roomId/messages', (req, res) => {
  const {roomId} = req.params;
  const { username, message } = req.body;

  const room = getRoomById(roomId);
  if (!room) {
    res.status(400).json({
      error: {
        message: `No room with ID ${roomId}`
      }
    });
    return
  }

  if (!room.users.has(username)) {
    res.status(400).json({
      error: {
        message: `No username ${username} for room ${roomId}`
      }
    });

    return
  }

  const newMessage = { id: `${roomId}/${room.messages.length}`, username, message };
  room.messages.push(newMessage);
  console.log(room.messages);

  res.json(newMessage);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getRoomById(roomId) {
  for (const chatroom of CHAT_ROOMS) {
    if (chatroom.id == roomId) {
      return chatroom
    }
  }

  return null;
}