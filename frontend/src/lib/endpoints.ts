const BASE_URL = 'http://localhost:8000/api/accounts';

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/login/`,
  REGISTER: `${BASE_URL}/register/`,
  REFRESH: `${BASE_URL}/token/refresh/`,
  ORGANIZATIONS: `${BASE_URL}/organizations/`,
  TEAMS: `${BASE_URL}/teams/`,
  PROFILE: (id: number) => `${BASE_URL}/profiles/${id}/`,
  USER_TEAMS: `${BASE_URL}/user-teams/`
};