import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

export async function PATCH(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  const id = getId(req);

  if (token) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: token.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      const openai = new OpenAI({
        apiKey: organization.openAIApiKey,
      });

      try {
        const body = await req.json();
        delete body.id;

        // TODO: Check if assistant exists and if the user is the owner
        let assistant = await prisma.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            object: true,
            organizationOwner: true,
            organizationOwnerType: true,
          },
        });

        if (
          !assistant ||
          assistant.organizationOwner !== token.sub ||
          assistant.organizationOwnerType !== 'personal'
        ) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // remove the items that don't belong to the body
        let avatar = body.avatar;
        delete body.avatar;

        let profile = body.profile;
        delete body.profile;

        let theme = body.theme;
        delete body.theme;

        // If the user is authorized, let us proceed
        const updateResponse = await openai.beta.assistants.update(id, body);

        await prisma.assistant.upsert({
          where: {
            id: updateResponse.id,
          },
          update: {
            id: updateResponse.id,
            organizationOwner: token.sub,
            organizationOwnerType: 'personal',
            object: updateResponse as any,
            avatar: avatar,
            profile: profile,
            theme: theme,
          },
          create: {
            id: updateResponse.id,
            organizationOwner: token.sub,
            organizationOwnerType: 'personal',
            object: updateResponse as any,
            avatar: avatar,
            profile: profile,
            theme: theme,
          },
        });

        return Response.json(updateResponse, { status: 200 });
      } catch (err: any) {
        return Response.json({ message: err.message }, { status: err.status });
      }
    } else {
      return Response.json(
        { message: 'OpenAI API Key does not exist' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
