import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // definir el interprete de los test con .ts para jest
  testEnvironment: 'node', // me permite habilitar el reconocimiento de jest para node
  verbose: true, // me permite visualizar los detalles que te entregan los test: ya sean existosos o no existosos
  coverageDirectory: 'coverage', // me permite habilitar un directorio de reporte de cobertura de test
  collectCoverage: true, // me permite habilitar un inspector de cobertura de test por la terminal, que me entrega el resultado del % cubierto como tabla de resumen del 100%, esto si pongo true. Si es false por se resulven los test pero no aparece la tabla resumen del coverage
  testPathIgnorePatterns: ['/node_modules/'], // me permite ignorar directorios que no formen parte del ecosistema de test
  transform: {
    // me permite ejecutar mis archivos de test con .ts mediante el preset de ts-jest
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'], // me permite definir donde se van a ir a leer los test, en que directorio
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'], // me permite definir a partir de que directorio voy a capturar la cobertura de test
  coverageThreshold: {
    // me permite agregar los umbrales de verificación para la cobertura de test
    global: {
      branches: 1, // Esto se refiere a los diferentes ramales en el flujo de control de mi código. Por ej: una sentencia if/else
      functions: 1, // Esto se refiere a la definición de las funciones que se han definido en mi código
      lines: 1, // Esto se refiere a las líneas individuales de tú código
      statements: 1 // Esto se refiere a cualquier sentencia de ejecución en el código. Por ej: asignaciones, instrucción de salida, llamada a una función, etc.
    }
  },
  coverageReporters: ['text-summary', 'lcov'], // me permite generar un resumen en texto de la cobertura de text
  moduleNameMapper: {
    '@bootstrap/(.*)': ['<rootDir>/src/bootstrap/$1'],
    '@configs/(.*)': ['<rootDir>/src/configs/$1'],
    '@auth/(.*)': ['<rootDir>/src/features/auth/$1'],
    '@user/(.*)': ['<rootDir>/src/features/user/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@decorators/(.*)': ['<rootDir>/src/shared/globals/decorators/$1'],
    '@helpers/(.*)': ['<rootDir>/src/shared/globals/helpers/$1'],
    '@services/(.*)': ['<rootDir>/src/shared/globals/services/$1'],
    '@socket/(.*)': ['<rootDir>/src/shared/globals/sockets/$1'],
    '@workers/(.*)': ['<rootDir>/src/shared/globals/workers/$1'],
    '@root/(.*)': ['<rootDir>/src/$1']
    /*'@bootstrap/(.*)': ['<rootDir>/src/bootstrap/$1'],
    '@configs/(.*)': ['<rootDir>/src/configs/$1'],
    '@auth/(.*)': ['<rootDir>/src/features/auth/$1'],
    '@user/(.*)': ['<rootDir>/src/features/user/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@decorators/(.*)': ['<rootDir>/src/shared/globals/decorators/$1'],
    '@helpers/(.*)': ['<rootDir>/src/shared/globals/helpers/$1'],
    '@services/(.*)': ['<rootDir>/src/shared/globals/services/$1'],
    '@socket/(.*)': ['<rootDir>/src/shared/globals/sockets/$1'],
    '@workers/(.*)': ['<rootDir>/src/shared/globals/workers/$1'],
    '@root/(.*)': ['<rootDir>/src/$1']*/
  }
};

export default config;
