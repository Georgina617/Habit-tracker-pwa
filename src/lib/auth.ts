import type { User, Session } from '../types/auth';
import { getUsers, setUsers, setSession, clearSession } from './storage';

// simple id generator (deterministic enough for this stage)
function generateId() {
  return crypto.randomUUID();
}

// ---------- SIGNUP ----------
export function signup(
  fullname: string,
  email: string,
  password: string,
): {
  success: boolean;
  error: string | null;
} {
  const users = getUsers() as User[];

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return {
      success: false,
      error: 'User already exists',
    };
  }

  const newUser: User = {
    id: generateId(),
    fullname,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
    fullname: newUser.fullname,
  };

  setSession(session);

  return {
    success: true,
    error: null,
  };
}

// ---------- LOGIN ----------
export function login(
  email: string,
  password: string,
): {
  success: boolean;
  error: string | null;
} {
  const users = getUsers() as User[];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
    fullname: user.fullname,
  };

  setSession(session);

  return {
    success: true,
    error: null,
  };
}

// ---------- LOGOUT ----------
export function logout() {
  clearSession();
}
