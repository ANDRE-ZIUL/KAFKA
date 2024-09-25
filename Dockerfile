# Utilizando a imagem base do Node.js
FROM node:18

# Criar diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código-fonte para o container
COPY . .

# Expor a porta 3000 para acessar a aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "src/server.js"]
