/**
 * Initialize Database API Route
 * GET /api/auth/init
 * Creates tables if they don't exist
 */
import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await initDB();
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      details: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database init error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        console_error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          type: error instanceof Error ? error.constructor.name : typeof error,
          code: (error as any)?.code,
          severity: (error as any)?.severity,
          detail: (error as any)?.detail,
        }
      },
      { status: 500 }
    );
  }
}
