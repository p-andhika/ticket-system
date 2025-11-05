export type ApiResponse<T> = {
  data: T;
};

export type HttpResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
};

export type HttpClientConfig = {
  baseURL: string;
  headers?: Record<string, string>;
};

export type HttpRequestConfig = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  [key: string]: unknown;
};

export type HttpClient = {
  get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
};
