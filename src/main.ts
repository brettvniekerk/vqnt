import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // initialize swagger
    const config = new DocumentBuilder()
        .setTitle("Very Quick Nest Template")
        .setDescription(
            "The Swagger interface for the Very Quick Nest Template"
        )
        .setVersion(process.env.npm_package_version)
        .addSecurity("jwt", {
            type: "http",
            scheme: "bearer"
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // expose endpoint
    SwaggerModule.setup("swagger", app, document);

    // disable leaking backend architecture
    app.getHttpAdapter().getInstance().disable("x-powered-by");

    await app.listen(3000);
}

bootstrap();
