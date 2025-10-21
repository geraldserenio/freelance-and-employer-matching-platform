export const BASE_URL =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_PRODUCTION_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL;
export const PDF_BASE_URL =
  process.env.NODE_ENV == "production"
    ? process.env.REACT_APP_PRODUCTION_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL;
