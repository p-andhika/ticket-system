import type { ApiResponse, ErrorResponse } from "@/lib/types/http-client";

/**
 * HTTP Status Code Error Messages (for non-2xx responses)
 * Used when server returns standard HTTP error codes
 */
export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  // Client errors (4xx)
  400: "Invalid request data",
  401: "Invalid email or password",
  403: "Access forbidden",
  404: "Resource not found",
  409: "Resource already exists",
  422: "Invalid input data",
  429: "Too many requests. Please try again later.",

  // Server errors (5xx)
  500: "Server error. Please try again later.",
  502: "Server error. Please try again later.",
  503: "Service unavailable. Please try again later.",
};

/**
 * API Error Code Messages (for 2xx responses with error in body)
 * Used when API returns success status but includes error object
 */
export const API_ERROR_CODE_MESSAGES: Record<string, string> = {
  // Auth errors
  user_already_exists: "Email already registered",
  invalid_credentials: "Invalid email or password",
  user_not_found: "User not found",
  weak_password: "Password is too weak",
  email_not_confirmed: "Please confirm your email first",

  // Account errors
  account_locked: "Account is locked or suspended",
  account_disabled: "Account has been disabled",

  // Rate limiting
  too_many_requests: "Too many requests. Please try again later.",
  rate_limit_exceeded: "Rate limit exceeded. Please try again later.",

  // Validation errors
  validation_error: "Invalid input data",
  invalid_email: "Invalid email format",
  invalid_password: "Invalid password format",

  // Token errors
  invalid_token: "Invalid or expired token",
  token_expired: "Token has expired",
  refresh_token_expired: "Session expired. Please login again",

  // Resource errors
  resource_not_found: "Resource not found",
  resource_already_exists: "Resource already exists",
  insufficient_permissions: "You do not have permission to perform this action",

  // Generic errors
  internal_error: "An internal error occurred",
  service_unavailable: "Service is temporarily unavailable",
};

export function checkResponseError(responseData: ErrorResponse): void {
  if (responseData?.code) {
    const code = responseData.code;

    const mappedCodeMessage = code ? API_ERROR_CODE_MESSAGES[code] : undefined;

    // Priority: API message > mapped error code > fallback
    const errorMessage = mappedCodeMessage;

    throw new Error(errorMessage || "Request failed");
  }
}

// eslint-disable-next-line
export function handleApiError(error: any, defaultMessage: string): never {
  // Re-throw errors from checkResponseError (already processed)
  if (error.message && !error.response && !error.request) {
    throw error;
  }

  // Network error - request made but no response received
  if (error.request && !error.response) {
    throw new Error("Network error. Please check your connection.");
  }

  // HTTP error response (non-2xx)
  if (error.response) {
    const status = error.response.status;

    // Use HTTP status code mapping
    throw new Error(HTTP_ERROR_MESSAGES[status] || defaultMessage);
  }

  // Fallback for unknown errors
  throw new Error(error.message || defaultMessage);
}

/**
 * Extract the data payload from an ApiResponse, ensuring it exists.
 */
export function extractResponseData<T>(
  response: T,
  fallbackMessage = "Invalid response from server",
): T {
  if (response !== null && response !== undefined) {
    return response;
  }

  throw new Error(fallbackMessage);
}

/**
 * Execute an API request that follows the ApiResponse envelope and return the data payload.
 */
export async function requestApiData<T>(
  request: () => Promise<ApiResponse<T>>,
  failureMessage: string,
  fallbackMessage = "Invalid response from server",
): Promise<T> {
  try {
    const response = await request();
    checkResponseError(response.error);
    return extractResponseData(response.data, fallbackMessage);
    // eslint-disable-next-line
  } catch (error: any) {
    throw handleApiError(error, failureMessage);
  }
}
