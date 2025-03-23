class response {
  constructor(statuscode, data, message = "success") {
    (this.statuscode = statuscode),
      (this.data = null),
      (this.message = message),
      (this.success = statuscode < 400);
  }
}

export { response };
