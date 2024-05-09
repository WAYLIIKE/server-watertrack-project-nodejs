const messageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

export class HttpError extends Error {
  constructor(status, message = messageList[status]) {
    super(message);
    this.status = status;
  }
}
