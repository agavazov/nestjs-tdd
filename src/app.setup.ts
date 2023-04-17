import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export async function appSetup(app: INestApplication) {
  // Pipes
  app.useGlobalPipes(
    // For this pipe config you will need 'class-validator' & 'class-transformer' packages
    new ValidationPipe({
      transform: true, // Enable DTO transformations
      whitelist: true, // Remove non declared DTO data

      // Debug mode
      enableDebugMessages: true,
      disableErrorMessages: false,

      // Log and return same errors - not the best idea for production
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        // console.error('exceptionFactory.errors', validationErrors);
        return new BadRequestException(validationErrors);
      },
    })
  );
}
