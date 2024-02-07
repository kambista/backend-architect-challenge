export interface Logger {
  log(data: { message: string; method: string; layer: string }): void;
}
