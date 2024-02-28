FROM node:latest

# Bunのインストールコマンド（必要に応じて）
RUN curl -fsSL https://bun.sh/install | bash 

# PATH環境変数にBunのバイナリパスを追加
ENV PATH="/root/.bun/bin:${PATH}"

# 作業ディレクトリを設定
WORKDIR /var/www/html

RUN apt-get update

RUN apt-get install -y vim lsof

COPY package.json .

RUN bun install

EXPOSE 5173
EXPOSE 8788

CMD ["bun", "run", "dev"]