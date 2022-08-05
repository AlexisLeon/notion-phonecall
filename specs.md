Propmpt

- A user can join a chat room.
- After joining, a user can send a message to that chat room.
- A user can retrieve messages from a chat room that they have joined.
- (Optional) A user can leave a chat room.
//
  The server should support multiple chat rooms.
//
  Take into account this API will be consumed by a basic chat app (think: slack, discord, basecamp, etc).

## User
- ID
- Name

## Chat room
- ID
- RoomID
- user IDs

## Messages
- ID uuid -> chatroomID/messageId
- UserID ref
- ChatRoomID ref
- Message string



## API
- Create chatroom
  - input
    - name 
  - outputs
    - Room id
    - name

- List Chatrooms
- Joining chatroom
  - croom by ID
  - user ID

- Get messages
  - uid
  - chatroom ID
