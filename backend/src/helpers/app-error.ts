export const enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  name?: string;
  httpCode?: HttpStatusCode;
  message: string;
  code?: number;
}

export class AppErrors extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly code: number;
  public readonly trace: string;
  public readonly description: string;
  public readonly error: boolean;

  constructor(args: AppErrorArgs) {
    super(args.message);
    this.name = args.name || 'Error';
    this.description = this.message;
    this.trace = this.stack || 'Stack not available';
    this.status = args.httpCode || 500;
    this.code = args.code || -1;
    this.error = true;
  }
}
