import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('BaaS [DCent Technologies Blockchain as a Service]')
    .setLicense('DCTLicense', 'https://license.dcent.technology')
    .setVersion('1.0')
    .setDescription('It works')
    .setContact(
      'DCent Tech',
      'https://dcent.technology',
      'support@dcent.technology',
    )
    .addTag('https://api.dcent.technology')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addSecurityRequirements('bearer')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1', app, document);
}
