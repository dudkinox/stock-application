export interface UserRequest {
  username: string;
  password?: string;
  major: string;
  canEdit: boolean;
  canDelete: boolean;
}
