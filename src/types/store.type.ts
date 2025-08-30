export type Store = {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  currentCode?: {
    code: string;
    createdAt: Date;
  };
  codesHistory: {
    code: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
