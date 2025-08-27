# Marvel App

### Requerimientos minimos
- Node >= 20.19.4

### 1. renombre el archivo .env.template a .env y establesca las variables con sus credenciales de la API de Marvel, puede obtenerlas desde el siguiente enlace: https://developer.marvel.com/

```shell
MARVEL_PUBLIC_KEY=<your_marvel_public_key>
MARVEL_PRIVATE_KEY=<your_marvel_secret_key>
```

### 2. Instale las dependencias

```shell
npm install
```

### 3. Ejecucion en modo de desarrollo

```shell
npm run dev
```

### 4. Ejecucion en modo producción

```shell
npm run build
npm start
```

### 5. Pruebas unitarias

```shell
npm run test
```

### 6. Pruebas unitarias con umbral de cobertura

```shell
npm run test:coverage
```
