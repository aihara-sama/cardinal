export enum GatewayEvents {
  FindComments = 'comment:find:all',
}
export enum ServerSocketEvents {
  CreateComment = 'comment:create',
  EditComment = 'comment:edit',
  DeleteComment = 'comment:delete',
  ReplyComment = 'comment:reply',
  JoinRoom = 'room:join',
  LeaveRoom = 'room:leave',
  LinkSocketUser = 'link:socket:user',
}
export enum ClientSocketEvents {
  Error = 'error',
  CreateComment = 'comment:created',
  EditComment = 'comment:edited',
  DeleteComment = 'comment:deleted',
  ReplyComment = 'comment:replied',
  JoinRoom = 'room:joined',
  Notification = 'notification',
}
