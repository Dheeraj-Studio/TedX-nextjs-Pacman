import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const username = (body.username || '').trim();
    if (!username) {
      return new Response(JSON.stringify({ error: 'username required' }), { status: 400 });
    }

    // Create user if doesn't exist, or get existing user
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username, highScore: 0, scores: [] }
    });

    return new Response(JSON.stringify({ ok: true, user }), { status: 201 });
  } catch (e) {
    console.error('Users POST error:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    
    if (username) {
      const user = await prisma.user.findUnique({
        where: { username }
      });
      if (!user) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });
      return new Response(JSON.stringify(user), { status: 200 });
    }
    
    // Return all users as an object (matching existing frontend format)
    const users = await prisma.user.findMany({
      orderBy: { highScore: 'desc' }
    });
    
    const usersObj = {};
    users.forEach(user => {
      usersObj[user.username] = user;
    });
    
    return new Response(JSON.stringify(usersObj), { status: 200 });
  } catch (e) {
    console.error('Users GET error:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
