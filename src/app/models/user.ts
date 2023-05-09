export interface User {
  uid?: string,
  email?: string | null,
  photoURL?: string | null,
  displayName?: string | null,
  emailVerified?: boolean,
  isAnonymous?: boolean,
  phoneNumber?: string | null,
  providerId?:string,
  refreshToken: string,
  tenantId?: string | null
}
