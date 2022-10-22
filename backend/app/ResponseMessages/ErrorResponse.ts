export class ErrorResponse {
  error: string;

  constructor(message: string) {
    this.error = message
  }
}