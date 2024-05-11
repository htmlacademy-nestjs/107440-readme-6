export const buildReqHeaders = (req: Request) => ({
  headers: {
    Authorization: req.headers['authorization'],
  },
});
