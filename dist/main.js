"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Gestion des Utilisateurs')
        .setDescription('API pour créer, lire, mettre à jour et supprimer des utilisateurs')
        .setVersion('1.0')
        .addTag('users')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map