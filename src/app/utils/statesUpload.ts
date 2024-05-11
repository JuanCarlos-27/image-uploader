export const STATES_UPLOAD = {
  INITIAL: 'INITIAL',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  ERROR: 'ERROR',
} as const;

export type StatesUpload = (typeof STATES_UPLOAD)[keyof typeof STATES_UPLOAD];
