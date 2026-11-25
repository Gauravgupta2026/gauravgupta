import next from 'eslint-config-next/core-web-vitals';
import ts from 'eslint-config-next/typescript';

const config = [...next, ...ts, { ignores: ['.next/**', 'src/scene/stadium.js'] }];
export default config;
