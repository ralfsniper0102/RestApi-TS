const resp = (s: number, m: unknown) => ({ status: s, message: m });
const respM = (s: number, m: unknown) => ({
  status: s,
  message: { message: m },
});
const respNoMessage = (s: number) => ({ status: s });
const respWithNameField = (s: number, m: unknown, n: string) => ({
  status: s,
  message: { [n]: m },
});


export { resp, respM, respNoMessage, respWithNameField };
