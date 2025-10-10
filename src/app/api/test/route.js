import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Test database connection
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database connection works!', 
      userCount: users.length,
      users: users 
    }), { status: 200 });
  } catch (e) {
    console.error('Database test error:', e);
    return new Response(JSON.stringify({ 
      success: false, 
      error: e.message 
    }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, score } = body;
    
    console.log('Test API - Creating user:', { username, score });
    
    const user = await prisma.user.create({
      data: {
        username: username || 'test_user',
        highScore: score || 100,
        scores: [score || 100]
      }
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'User created successfully!',
      user 
    }), { status: 201 });
  } catch (e) {
    console.error('Test API error:', e);
    return new Response(JSON.stringify({ 
      success: false, 
      error: e.message 
    }), { status: 500 });
  }
}