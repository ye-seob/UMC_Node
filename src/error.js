export class DuplicateUserEmailError extends Error {
  errorCode = "4001_USER_DUPLICATE";

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
export class GenericUserError extends Error {
  errorCode = "U999";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
