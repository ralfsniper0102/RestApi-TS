const resp = (s: number, m: unknown) => ({ status: s, message: m });
const respM = (s: number, m: unknown) => ({
  status: s,
  message: { message: m },
});

const respNoMessage = (s: number) => ({ status: s });

export { resp, respM, respNoMessage };
