export default class CustomError extends Error {
    // 'message' prop comes from base Error class!
    statusCode: number;
    additionalProps: any;
  
    constructor(message: string, statusCode: number, additionalProps?: object) {
      super(message);
      this.statusCode = statusCode;
      this.additionalProps = additionalProps;
    }
  }
  