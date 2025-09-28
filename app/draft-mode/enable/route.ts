import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('SANITY_API_READ_TOKEN is not set');
}

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  );

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}
