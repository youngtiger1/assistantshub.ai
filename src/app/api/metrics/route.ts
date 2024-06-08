import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  let assistantId = req.headers.get('X-Assistant-Id');
  let metricName = req.nextUrl.searchParams.get('metric');
  let timeBucket = req.nextUrl.searchParams.get('timeBucket');
  let startDateTime = req.nextUrl.searchParams.get('startDateTime');
  let endDateTime = req.nextUrl.searchParams.get('endDateTime');

  if (session) {
    //TODO: check if the assistant belongs to the token
    let results =
      await prisma.$queryRawUnsafe(`SELECT time_bucket('${timeBucket}', time) AS x,
                sum(value) AS y
       FROM public."Metric"
       WHERE name = '${metricName}'
        AND "assistantId" = '${assistantId}'
        AND time BETWEEN '${startDateTime}'::timestamp
	          AND '${endDateTime}'::timestamp
       GROUP BY x, "assistantId"`);

    return Response.json(results, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
