export const TOKEN_KEY = 'aarogyaToken';
export const BASE_URL = "http://arogya.com";
//Resource APIs
export const API_OAUTH_GET = `${BASE_URL}/oauth/token`;
export const API_OAUTH_REFRESH = `${BASE_URL}/oauth/refreshtoken`;

//Logout
//export const API_LOGOUT = `${BASE_URL}/api/v1/logout`;


/*
* CONFIG DATA APIs
 */

//USER
export const API_USER_SAVE = `${BASE_URL}/impl/api/v1/users`;
export const API_USER_UPDATE = `${BASE_URL}/impl/api/v1/users/{username}`;
export const API_USER_GET = `${BASE_URL}/impl/api/v1/users`;
export const API_USER_GET_ONE = `${BASE_URL}/impl/api/v1/users/{username}`;

//USER STATUS
export const API_USER_STATUS = `${BASE_URL}/impl/api/v1/users/{username}/{status}`;

//STAFFS
export const API_STAFFS_GET_ALL = `${BASE_URL}/impl/api/v1/staffs`;
export const API_STAFFS_SAVE = `${BASE_URL}/impl/api/v1/staffs`;
export const API_STAFFS_GET_ONE = `${BASE_URL}/impl/api/v1/staffs/{id}`;
export const API_STAFFS_GET_BY_TYPE = `${BASE_URL}/impl/api/v1/staffs/types/{type}`;
export const API_STAFFS_UPDATE = `${BASE_URL}/impl/api/v1/staffs/{id}`;

//PATIENTS
export const API_PATIENTS_GET_ALL = `${BASE_URL}/impl/api/v1/patients`;
export const API_PATIENTS_SAVE = `${BASE_URL}/impl/api/v1/patients`;
export const API_PATIENTS_GET_ONE = `${BASE_URL}/impl/api/v1/patients/{id}`;
export const API_PATIENTS_GET_BY_TYPE = `${BASE_URL}/impl/api/v1/patients/types/{patientType}`;
export const API_PATIENTS_UPDATE = `${BASE_URL}/impl/api/v1/patients/{id}`;

//REPORTS
export const API_PATIENTS_HEALTH_REPORT = `${BASE_URL}/impl/api/v1/patients/{id}/healthreports`;

//UI
export const UI_DASHBOARD_PAGE =`${BASE_URL}/dashboard`;
export const UI_LOGIN_PAGE =`${BASE_URL}/login`;