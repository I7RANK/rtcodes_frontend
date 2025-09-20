export type CurrentCode = {
  code: string;
  createdAt: Date;
};

export type Store = {
  _id: string;
  name: string;
  address?: string;
  city?: string;
  currentCode?: CurrentCode;
  codesHistory: CurrentCode[];
  createdAt: Date;
  updatedAt: Date;
};
