declare global {
  namespace Express {
    interface Request {
      customData?: any; // Replace 'any' with your data type
    }
  }
}
