# Usando imagem do Node.js
FROM node:18

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todo o código para o contêiner
COPY . .

# Expondo a porta 3000
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["node", "src/server.js"]
