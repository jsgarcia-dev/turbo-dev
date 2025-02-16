export interface User {
  id: string;
  name: string | null;
  email: string;
  role: "MASTER" | "ADMIN" | "USER";
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
