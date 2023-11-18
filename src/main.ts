import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("TODO List - API")
    .setDescription("Todo list api created for JalaSoft Dev Test")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      customSiteTitle: "Swagger - TODO List",
      swaggerOptions: {
        docExpansion: "none",
      },
    },
  });

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
