import mongoose, { connect, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE } from '../config';
import { logger } from '../utils/logger'; // Asumiendo que tienes un módulo logger

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  };

  logger.info('Configuración de la base de datos:', dbConfig);

  mongoose.set('strictQuery', false);

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  try {
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado a MongoDB');
  } catch (error) {
    logger.error('Error al conectar a MongoDB:', error);
  }
};
