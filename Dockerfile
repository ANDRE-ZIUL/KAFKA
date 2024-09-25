# Utilizando a imagem base do Node.js
FROM node:18

# Criar diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos do package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação para o container
COPY . .

# Expor a porta 3000 para acessar a aplicação
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["node", "server.js"]
