import { ErrorResponse } from "./ErrorResponse";

export class MissingRequiredKeyResponse extends ErrorResponse {
  /**
   *
   */
  constructor(missingKey: string) {
    super(`Missing required key: ${missingKey}`);
    
  }
}