import { errorConfig } from "./network.config";
import { type ErrorResponse } from "../utils/request";

export function errorGenerator(
  statusCode: keyof typeof errorConfig,
  errors?: ErrorResponse["errors"]
): ErrorResponse {
  if (!(statusCode in errorConfig)) {
    return {
      code: "Unknown",
      status: statusCode,
      errors,
    };
  }
  return {
    code: errorConfig[statusCode] ?? "Unknown",
    status: statusCode,
    errors,
  };
}
