import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const username = (body.username || '').trim();
    const score = Number(body.score) || 0;
    console.log('Scores API - Received:', { username, score, originalScore: body.score });
    
    if (!username) {
      return new Response(JSON.stringify({ error: 'username required' }), { status: 400 });
    }

    // Get existing user or create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      console.log('Creating new user with score:', score);
      user = await prisma.user.create({
        data: { username, highScore: score, scores: [score] }
      });
    } else {
      // Add new score to scores array and update highScore if needed
      const newScores = [...user.scores, score];
      const newHighScore = Math.max(user.highScore, score);
      console.log('Updating existing user:', { oldHighScore: user.highScore, newHighScore, newScores });
      
      user = await prisma.user.update({
        where: { username },
        data: {
          scores: newScores,
          highScore: newHighScore
        }
      });
    }

    console.log('Final user data:', user);
    return new Response(JSON.stringify({ ok: true, user }), { status: 201 });
  } catch (e) {
    console.error('Scores POST error:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    if (!username) return new Response(JSON.stringify({ error: 'username missing' }), { status: 400 });
    
    const user = await prisma.user.findUnique({
      where: { username }
    });
    
    if (!user) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    console.error('Scores GET error:', e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
