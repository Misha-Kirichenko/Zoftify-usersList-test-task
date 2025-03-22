import { applyDecorators } from '@nestjs/common';
type TAnyDecorator = ClassDecorator | MethodDecorator | PropertyDecorator;

export const AbstractCreateDocs =
  (commonDecorators: TAnyDecorator[] = []) =>
  (endpointDecorators: TAnyDecorator[] = []) => {
    if (process.env.NODE_ENV !== 'development') {
      return () => {};
    }
    return applyDecorators(...commonDecorators, ...endpointDecorators);
  };