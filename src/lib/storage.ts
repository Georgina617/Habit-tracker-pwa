const USERS_KEY = 'habit-tracker-users';
const SESSION_KEY = 'habit-tracker-session';
const HABITS_KEY = 'habit-tracker-habits';

export function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function setUsers(users: unknown[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function setSession(session: unknown) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getHabits() {
  const data = localStorage.getItem(HABITS_KEY);
  return data ? JSON.parse(data) : [];
}

export function setHabits(habits: unknown[]) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}
