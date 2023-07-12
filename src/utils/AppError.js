class AppError {
  message;
  statuCode;

  constructor(message, statuCode = 400) {
    this.message = message;
    this.statuCode = statuCode;
  }
}

module.exports = AppError;