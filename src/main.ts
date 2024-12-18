import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: "*"
        },
        rawBody: true
    });

    // disable leaking backend architecture
    app.getHttpAdapter().getInstance().disable("x-powered-by");

    // enable global validation
    app.useGlobalPipes(new ValidationPipe());

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

    await app.listen(PORT, () =>
        new Logger().log(`Server started @ http://localhost:${PORT}/swagger\n`)
    );
}

bootstrap();
