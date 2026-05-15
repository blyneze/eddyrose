/**
 * Typed API client for the Eddyrose backend.
 *
 * All methods are called from Next.js server-side code (Server Actions,
 * API Routes, Server Components). They are NEVER called from the browser.
 *
 * Authentication model:
 * - Every request includes the INTERNAL_API_SECRET header.
 * - Requests that act on behalf of a logged-in user also include
 *   x-user-id and x-user-role headers so the backend can authorise correctly.
 */

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:4000'
const API_SECRET = process.env.INTERNAL_API_SECRET ?? ''

if (!API_SECRET && process.env.NODE_ENV === 'production') {
  console.error('⚠️  INTERNAL_API_SECRET is not set. Backend calls will fail.')
}

type ActingUser = { id: string; role: string }

function buildHeaders(user?: ActingUser): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-secret': API_SECRET,
  }
  if (user) {
    headers['x-user-id'] = user.id
    headers['x-user-role'] = user.role
  }
  return headers
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  user?: ActingUser
): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: buildHeaders(user),
    // Server-side: no caching by default (always fresh data)
    cache: 'no-store',
  })

  if (!res.ok) {
    let message = `Backend error ${res.status}`
    try {
      const body = await res.json()
      message = body.error ?? message
    } catch {}
    throw new Error(message)
  }

  // For PDF (binary) responses, callers use fetchPDF instead
  return res.json() as Promise<T>
}

/** Used for binary (PDF) responses */
async function fetchBinary(path: string, user?: ActingUser): Promise<Response> {
  return fetch(`${BACKEND_URL}${path}`, {
    headers: buildHeaders(user),
    cache: 'no-store',
  })
}

// ─── Auth ──────────────────────────────────────────────────────────────────
export const backendAuth = {
  verify: (loginId: string, password: string) =>
    apiFetch<{ id: string; name: string; role: string }>('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ loginId, password }),
    }),
}

// ─── Users ─────────────────────────────────────────────────────────────────
export const backendUsers = {
  list: (user: ActingUser) => apiFetch<any[]>('/api/users', {}, user),

  getById: (user: ActingUser, userId: string) =>
    apiFetch<any>(`/api/users/${userId}`, {}, user),

  create: (user: ActingUser, data: { name: string; loginId: string; password: string; role: string }) =>
    apiFetch<any>('/api/users', { method: 'POST', body: JSON.stringify(data) }, user),

  updateName: (user: ActingUser, userId: string, name: string) =>
    apiFetch<any>(`/api/users/${userId}/name`, { method: 'PUT', body: JSON.stringify({ name }) }, user),

  changePassword: (
    user: ActingUser,
    userId: string,
    currentPassword: string,
    newPassword: string
  ) =>
    apiFetch<any>(
      `/api/users/${userId}/password`,
      { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) },
      user
    ),
}

// ─── Students ──────────────────────────────────────────────────────────────
export const backendStudents = {
  list: (user: ActingUser) => apiFetch<any[]>('/api/students', {}, user),

  create: (user: ActingUser, data: { name: string; registrationNumber: string }) =>
    apiFetch<any>('/api/students', { method: 'POST', body: JSON.stringify(data) }, user),

  /** Returns the parent profile with linked children — for /portal/children */
  children: (user: ActingUser) => apiFetch<any>('/api/students/children', {}, user),
}

// ─── Results ───────────────────────────────────────────────────────────────
export const backendResults = {
  forAdmin: (user: ActingUser) => apiFetch<any[]>('/api/results/admin', {}, user),
  forTeacher: (user: ActingUser) => apiFetch<any>('/api/results/teacher', {}, user),
  forParent: (user: ActingUser) => apiFetch<any[]>('/api/results/parent', {}, user),

  getById: (user: ActingUser, id: string) => apiFetch<any>(`/api/results/${id}`, {}, user),

  /** Returns calculated result data for the admin review page. */
  review: (user: ActingUser, id: string) => apiFetch<any>(`/api/results/${id}/review`, {}, user),

  publish: (user: ActingUser, id: string) =>
    apiFetch<any>(`/api/results/${id}/publish`, { method: 'POST' }, user),

  reject: (user: ActingUser, id: string, feedback: string) =>
    apiFetch<any>(`/api/results/${id}/reject`, { method: 'POST', body: JSON.stringify({ feedback }) }, user),

  updateScores: (user: ActingUser, id: string, scores: Record<string, { test: number | null; exam: number | null }>) =>
    apiFetch<any>(`/api/results/${id}/scores`, { method: 'PUT', body: JSON.stringify({ scores }) }, user),

  submitClassDrafts: (user: ActingUser, classId: string) =>
    apiFetch<any>(`/api/results/class/${classId}/submit`, { method: 'POST' }, user),

  downloadPDF: (user: ActingUser, studentId: string, sessionId: string, termId: string) =>
    fetchBinary(`/api/results/download/${studentId}/${sessionId}/${termId}`, user),
}

// ─── Academic ──────────────────────────────────────────────────────────────
export const backendAcademic = {
  getData: (user: ActingUser) => apiFetch<any>('/api/academic/data', {}, user),
  createClass: (user: ActingUser, name: string) =>
    apiFetch<any>('/api/academic/classes', { method: 'POST', body: JSON.stringify({ name }) }, user),
  createSession: (user: ActingUser, name: string) =>
    apiFetch<any>('/api/academic/sessions', { method: 'POST', body: JSON.stringify({ name }) }, user),
  createTerm: (user: ActingUser, name: string) =>
    apiFetch<any>('/api/academic/terms', { method: 'POST', body: JSON.stringify({ name }) }, user),
  createSubject: (user: ActingUser, name: string) =>
    apiFetch<any>('/api/academic/subjects', { method: 'POST', body: JSON.stringify({ name }) }, user),
  setCurrent: (user: ActingUser, id: string, type: 'SESSION' | 'TERM') =>
    apiFetch<any>('/api/academic/set-current', { method: 'POST', body: JSON.stringify({ id, type }) }, user),
  assignTeacher: (user: ActingUser, classId: string, teacherProfileId: string) =>
    apiFetch<any>('/api/academic/assign-teacher', { method: 'POST', body: JSON.stringify({ classId, teacherProfileId }) }, user),
  linkSubject: (user: ActingUser, classId: string, subjectId: string) =>
    apiFetch<any>('/api/academic/link-subject', { method: 'POST', body: JSON.stringify({ classId, subjectId }) }, user),
}

// ─── Content ───────────────────────────────────────────────────────────────
export const backendContent = {
  get: (user: ActingUser) => apiFetch<any>('/api/content', {}, user),

  createAnnouncement: (user: ActingUser, data: { title: string; summary?: string; content: string }) =>
    apiFetch<any>('/api/content/announcements', { method: 'POST', body: JSON.stringify(data) }, user),

  deleteAnnouncement: (user: ActingUser, id: string) =>
    apiFetch<any>(`/api/content/announcements/${id}`, { method: 'DELETE' }, user),

  createEvent: (user: ActingUser, data: { title: string; description?: string; date: string; time?: string; venue?: string }) =>
    apiFetch<any>('/api/content/events', { method: 'POST', body: JSON.stringify(data) }, user),

  deleteEvent: (user: ActingUser, id: string) =>
    apiFetch<any>(`/api/content/events/${id}`, { method: 'DELETE' }, user),
}

// ─── Overview ──────────────────────────────────────────────────────────────
export const backendOverview = {
  stats: (user: ActingUser) =>
    apiFetch<{ studentCount: number; classCount: number; draftCount: number; eventCount: number }>(
      '/api/overview/stats',
      {},
      user
    ),
}

// ─── Contact ───────────────────────────────────────────────────────────────
export const backendContact = {
  submit: (data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    inquiryType: string
    message: string
  }) =>
    apiFetch<{ success: boolean; message?: string; error?: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
