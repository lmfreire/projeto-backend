import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite requisições de qualquer origem. Substitua '*' por um array de URLs específicas para maior segurança.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite envio de cookies, se necessário
  });

  // Lógica para fazer ping em google.com a cada 3 minutos
  setInterval(() => {
    https.get('https://www.google.com', (res) => {
      console.log(`Ping Google: Status Code ${res.statusCode}`);
    }).on('error', (err) => {
      console.error('Erro ao fazer ping em Google:', err.message);
    });
  }, 3 * 60 * 1000); // 3 minutos em milissegundos

  await app.listen(3000);
}
bootstrap();
