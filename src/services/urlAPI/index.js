export const DOMAIN_NAME = process.env.REACT_APP_BASE_URL;
export const DOMAIN_NAME_FILE_SERVICE =
  process.env.REACT_APP_BASE_URL_FILE_SERVICE;
export const STATUS_SUCCESS = 200;
export const STATUS_CREATE_SUCCESS = 201;
export const STATUS_NO_CONTENT = 204;
export const STATUS_NOT_FOUND = 404;

//ADMINISTRATIVE
export const URL_GET_PROVINCES = `${DOMAIN_NAME}/administrative/provinces`;
export const URL_GET_DISTRICTS = (pCode) =>
  `${DOMAIN_NAME}/administrative/districts/p/${pCode}`;
export const URL_GET_WARDS = (dCode) =>
  `${DOMAIN_NAME}/administrative/wards/d/${dCode}`;

//IMAGE
export const URL_POST_IMAGE = `${DOMAIN_NAME_FILE_SERVICE}`;

//USER
export const URL_POST_LOGIN = `${DOMAIN_NAME}/auth/signin`;

//PROPERTY
export const URL_GET_PROPERTIES = `${DOMAIN_NAME}/properties`;
export const URL_GET_PROPERTY_BY_SLUG = (slug) =>
  `${DOMAIN_NAME}/properties/slug/${slug}`;
export const URL_POST_PROPERTY = `${DOMAIN_NAME}/properties`;
export const URL_UPDATE_PROPERTY = (id) => `${DOMAIN_NAME}/properties/${id}`;
export const URL_DELETE_PROPERTY = (id) => `${DOMAIN_NAME}/properties/${id}`;

//CONTACT
export const URL_GET_CONTACTS = `${DOMAIN_NAME}/contacts`;
export const URL_GET_ALL_CONTACTS = `${DOMAIN_NAME}/contacts/allcontacts`;
export const URL_UPDATE_CONTACT = (id) => `${DOMAIN_NAME}/contacts/${id}`;
export const URL_DELETE_CONTACT = (id) => `${DOMAIN_NAME}/contacts/${id}`;

//POSTS
export const URL_GET_POSTS = `${DOMAIN_NAME}/posts`;
export const URL_GET_POSTS_WITH_POST_TYPE = (postType) =>
  `${DOMAIN_NAME}/posts?postType=${postType}`;
export const URL_GET_POST_BY_SLUG = (slug) =>
  `${DOMAIN_NAME}/posts/slug/${slug}`;
export const URL_POST_POST = `${DOMAIN_NAME}/posts`;
export const URL_UPDATE_POST = (id) => `${DOMAIN_NAME}/posts/${id}`;
export const URL_DELETE_POST = (id) => `${DOMAIN_NAME}/posts/${id}`;
