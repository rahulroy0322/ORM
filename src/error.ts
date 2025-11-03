class DbError extends Error {
  public meta?: Record<string, unknown>;
  constructor(mesage: string, meta?: Record<string, unknown>) {
    super(mesage);
    this.meta = meta;
  }
}

class ValidetionError extends DbError {
  // biome-ignore lint/complexity/noUselessConstructor: AS there meta is required
  constructor(mesage: string, meta: Record<string, unknown>) {
    super(mesage, meta);
  }
}

export { ValidetionError };
