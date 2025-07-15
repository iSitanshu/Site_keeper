declare module 'next-connect' {
  import { NextApiRequest, NextApiResponse } from 'next';

  type NextConnectOptions = {
    onError?: (err: any, req: NextApiRequest, res: NextApiResponse) => void;
    onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
  };

  function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
    options?: NextConnectOptions
  ): any;

  export default nextConnect;
}
