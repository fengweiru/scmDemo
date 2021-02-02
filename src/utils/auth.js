import { authLoginUrl } from '@/config/default'
/** 登出 */
export function logout() {
  // 登出
  localStorage.setItem('auth-info', '')
  location.href = `${authLoginUrl}/#/user/login?from=${location.href}`
}
