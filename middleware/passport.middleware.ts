
export const passportMiddleware = (request: { session: { regenerate: (cb: any) => void; save: (cb: any) => void; }; }, response: any, next: () => void) => {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb: () => void) => {
        cb();
      };
    }
  
    if (request.session && !request.session.save) {
      request.session.save = (cb: () => void) => {
        cb();
      };
    }
  
    next();
  };
  
  