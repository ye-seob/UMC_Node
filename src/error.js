export class AlreadyExistError extends Error {
  errorCode = "ALREADY_EXIST";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotFoundError extends Error {
  errorCode = "4001_DATA_NOT_FOUND";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class InvalidInputError extends Error {
  errorCode = "INVALID_INPUT";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
