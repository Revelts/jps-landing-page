/**
 * Authentication Middleware
 * Validates user session and provides user info for protected routes
 */

import { cookies } from 'next/headers';
import { sql } from './db';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  emailVerified: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

/**
 * Authenticate user from request
 * Validates session token and returns user info
 */
export async function authenticateUser(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'No session token found',
      };
    }

    // Validate session token
    const result = await sql`
      SELECT 
        s.id as session_id,
        s.expires_at,
        u.id,
        u.email,
        u.name,
        u.role,
        u.email_verified
      FROM sessions s
      INNER JOIN users u ON s.user_id = u.id
      WHERE s.token = ${token}
      AND s.expires_at > NOW()
    `;

    if (result.length === 0) {
      return {
        success: false,
        error: 'Invalid or expired session',
      };
    }

    const userData = result[0];

    return {
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        emailVerified: userData.email_verified,
      },
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Require authentication
 * Returns user or throws error
 */
export async function requireAuth(): Promise<AuthUser> {
  const auth = await authenticateUser();

  if (!auth.success || !auth.user) {
    throw new Error(auth.error || 'Authentication required');
  }

  return auth.user;
}

/**
 * Check if user has specific role
 */
export async function requireRole(allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }

  return user;
}
