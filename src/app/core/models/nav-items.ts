export interface NavItems {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItems[];
}
