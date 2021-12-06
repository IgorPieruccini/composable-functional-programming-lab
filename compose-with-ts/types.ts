export interface Link {
  url: string;
  title: string;
  groupId: string;
  userId: string;
}

export type LinkState = Record<string, Link>;
