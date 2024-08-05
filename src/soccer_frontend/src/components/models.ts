export interface LoginCredentials {
  login: string,
  password: string
}

export interface LoginCredentialsResponse {
  refresh: string,
  access: string
}

export interface PlayerInfoResponse {
  id: number,
  rating: number,
  deviation: number,
  volatility: number,
  user: number
}
