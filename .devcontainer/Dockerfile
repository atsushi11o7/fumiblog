FROM node:24-trixie-slim

ENV DEBIAN_FRONTEND=noninteractive \
    NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    npm_config_update_notifier=false

WORKDIR /workspace

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
 && apt-get update \
 && apt-get install -y --no-install-recommends gh \
 && rm -rf /var/lib/apt/lists/*

USER node

# Claude Code
RUN curl -fsSL https://claude.ai/install.sh | bash

EXPOSE 3000 6006 9229

CMD ["bash"]
