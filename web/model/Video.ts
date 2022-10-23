import { User } from "./User";

export interface Video {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  user: User;
  createdAt: Date;
}
