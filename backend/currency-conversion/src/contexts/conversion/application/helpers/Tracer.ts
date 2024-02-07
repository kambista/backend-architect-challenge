export interface Tracer {
  traceId: string;
  getTrace(): string;
  setTrace(traceId: string): string;
}
