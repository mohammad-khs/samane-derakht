export interface AuthResponse {
  token: string;
  otp_send: boolean;
}

export const mockAuthResponse: AuthResponse = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token",
  otp_send: true,
};