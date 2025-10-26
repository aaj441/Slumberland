import { handler as appHandler } from '../src/server/trpc/handler';

export default async function handler(req, res) {
  return appHandler(req, res);
}

