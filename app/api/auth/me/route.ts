import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getAuthUser, unauthorizedResponse } from '@/src/lib/auth/middleware';

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from JWT
    const authUser = await getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Get full user data from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        totalPoints: true,
        createdAt: true,
        _count: {
          select: {
            myQuizzes: true,
            myAttempts: true,
          },
        },
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...user,
        stats: {
          totalQuizzes: user._count.myQuizzes,
          totalAttempts: user._count.myAttempts,
        },
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
