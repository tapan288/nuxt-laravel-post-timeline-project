declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
  }

  interface LoginForm {
    email: string;
    password: string;
  }
}
