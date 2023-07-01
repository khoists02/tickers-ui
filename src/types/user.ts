export interface AuthenticatedUserResponse {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  permissions?: string[];
  sessionId?: string;
}
