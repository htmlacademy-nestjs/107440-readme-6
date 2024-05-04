export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Blog = 'http://localhost:3334/api/posts',
  Notify = 'http://localhost:4000/api/notify',
  FileStorage = 'http://localhost:3335/api/file-storage',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
