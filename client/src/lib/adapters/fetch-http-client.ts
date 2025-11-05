import type {
  ApiResponse,
  HttpClient,
  HttpClientConfig,
  HttpRequestConfig,
  HttpResponse,
} from "@/lib/types/http-client";
import axios, { type Options } from "redaxios";

class FetchHttpClient implements HttpClient {
  private axiosInstance: typeof axios;

  constructor(config: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers || {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(
      url,
      config as Options,
    );

    return {
      data: response.data.data,
      status: response.status,
      headers: response.headers as unknown as Record<string, string>,
    };
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config as Options,
    );

    return {
      data: response.data.data,
      status: response.status,
      headers: response.headers as unknown as Record<string, string>,
    };
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config as Options,
    );

    return {
      data: response.data.data,
      status: response.status,
      headers: response.headers as unknown as Record<string, string>,
    };
  }

  async delete<T>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(
      url,
      config as Options,
    );

    return {
      data: response.data.data,
      status: response.status,
      headers: response.headers as unknown as Record<string, string>,
    };
  }
}

// Factory function.
export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  return new FetchHttpClient(config);
};
