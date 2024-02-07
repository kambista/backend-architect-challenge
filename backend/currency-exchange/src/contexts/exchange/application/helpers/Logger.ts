export interface Logger {
  log(data: {
    message: string;
    method: string;
    layer: string;
    transaction?: Record<string, any>;
  }): void;
}
