import axios from "axios";
import { MeteringPoint, LoginResponse, ElectricityReading } from "./types";

export default class MetiundoAPI {
  private email: string;
  private password: string;
  private apiUrl = "https://api.metiundo.de/v1";
  private token: string | null = null;

  constructor({ email, password }: Options) {
    this.email = email;
    this.password = password;
  }

  private getHeaders(token: string | undefined = undefined) {
    const headers: { [key: string]: string } = {
      "Content-Type": "Application/json",
    };

    if (!token) {
      // token is not provided
      return headers;
    }

    // token is provided
    headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  async getAccessToken(): Promise<string | null> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.apiUrl}/auth/login`,
        {
          email: this.email,
          password: this.password,
        },
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.tokens.accessToken;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("error logging in to API", err.response?.data);
      }

      return null;
    }
  }

  async getMeteringPoints(token: string): Promise<MeteringPoint[] | null> {
    try {
      const response = await axios.get<MeteringPoint[]>(
        `${this.apiUrl}/meteringpoints`,
        {
          headers: this.getHeaders(token),
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("error getting metering points", err.response?.data);
      }

      return null;
    }
  }

  async getTimerangeReadings(
    from: number,
    to: number,
    uuid: string,
    token: string
  ): Promise<ElectricityReading[] | null> {
    const url = `${this.apiUrl}/meteringpoints/${uuid}/readings?from=${from}&to=${to}`;

    try {
      const response = await axios.get<ElectricityReading[]>(url, {
        headers: this.getHeaders(token),
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("error getting metering points", err.response?.data);
      }

      return null;
    }
  }
}

interface Options {
  email: string;
  password: string;
}