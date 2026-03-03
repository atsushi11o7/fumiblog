# .devcontainer/frontend/Dockerfile

FROM node:24-bookworm-slim

# プロキシ設定（devcontainer.jsonから上書き）
ARG HTTP_PROXY=""
ARG HTTPS_PROXY=""
ARG NO_PROXY="localhost,127.0.0.1"

# 環境変数
ENV http_proxy=${HTTP_PROXY} \
    https_proxy=${HTTPS_PROXY} \
    no_proxy=${NO_PROXY} \
    LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8 \
    DEBIAN_FRONTEND=noninteractive \
    NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    TZ=Asia/Tokyo \
    npm_config_update_notifier=false

WORKDIR /workspace

# 基本パッケージ + 日本語フォント
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    vim \
    wget \
    tree \
    locales \
    fonts-noto-cjk \
    tzdata \
    ca-certificates \
 && locale-gen ja_JP.UTF-8 \
 && rm -rf /var/lib/apt/lists/*

# nodeユーザーのホームディレクトリ権限設定
RUN mkdir -p /home/node/.cache /home/node/.local \
 && chown -R node:node /home/node

USER node

EXPOSE 3000 6006 9229

CMD ["bash"]
