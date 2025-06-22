'use strict';

const StatusCode = {
  OK: 200,
  CREATED: 201,
};
const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created',
};

class SuccessResponse {
  Constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {}
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}
