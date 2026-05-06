const API_URL = 'https://admin.atee.app'

interface User {
  id: string
  email: string
  name: string | null
}

const user = ref<User | null>(null)
const token = ref<string | null>(null)
const loading = ref(true)

export function useAuth() {
  const isLoggedIn = computed(() => !!user.value)

  async function init() {
    if (import.meta.server) return
    const saved = localStorage.getItem('atee_token')
    if (!saved) {
      loading.value = false
      return
    }
    token.value = saved
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${saved}` },
      })
      const data = await res.json()
      if (data.success) {
        user.value = data.user
      } else {
        localStorage.removeItem('atee_token')
        token.value = null
      }
    } catch {
      localStorage.removeItem('atee_token')
      token.value = null
    } finally {
      loading.value = false
    }
  }

  function setSession(t: string, u: User) {
    token.value = t
    user.value = u
    localStorage.setItem('atee_token', t)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('atee_token')
  }

  async function register(email: string, password: string, name?: string, phone?: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, phone }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    setSession(data.token, data.user)
    return data
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/user-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    setSession(data.token, data.user)
    return data
  }

  return { user, token, loading, isLoggedIn, init, register, login, logout }
}
