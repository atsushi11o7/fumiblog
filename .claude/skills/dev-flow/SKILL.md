---
name: dev-flow
description: |
  FumiBlog 開発の標準ワークフローを一気通貫で実行する skill。develop からブランチを切る → 変更を加える → コミット → push → PR 作成 までをカバーする。
  ユーザーが「ブランチ切って」「PR 作って」「機能追加して PR お願い」「Hero リファクタしてマージリクエスト出して」「fix/xxx で枝を切って〜」「develop から作業ブランチ作成」など、変更開始からマージリクエスト提出までのフローを含む指示をした時、明示的に skill 名を呼ばれなくても必ず使用する。
  ブランチ作成だけ、PR 作成だけ、push だけ、といった部分的な指示でも、該当ステップを参照する。プロジェクトの規約（コミット形式、ディレクトリ構造、テーマトークン、ブランチ運用）はリポジトリの CLAUDE.md に記載されているので、本 skill の内容と CLAUDE.md を併せて参照する。
---

# Dev Flow (FumiBlog)

「ブランチ作成 → 変更 → コミット → push → PR 作成」を一気通貫で回す skill。

プロジェクト固有の規約（コミット形式、Atomic Design、テーマトークン、ブランチ運用）は **CLAUDE.md** に記載されている。本 skill は CLAUDE.md の規約に従う前提で、workflow の step だけを定義する。CLAUDE.md と本 skill が矛盾する場合は CLAUDE.md を優先する。

## 1. ブランチ作成

`develop` を最新化してから分岐する：

```bash
git fetch origin
git switch develop
git pull
git switch -c <branch-name>
```

命名: `<type>/<short-kebab-description>`

- `type`: `feature` / `fix` / `refactor` / `chore` / `docs`
- `description`: 英語小文字 kebab-case
- 例: `feature/add-search-bar`, `fix/hero-mobile-layout`, `refactor/featured-card`

未コミットの変更がある状態で開始する場合は、**先にユーザーに確認**してから `git stash` するか、変更を破棄するか判断する。勝手に `reset --hard` 等は実行しない。

## 2. 変更を加える

CLAUDE.md の `Architecture` / `Theming` / `Boot screen` セクションに従う。要点:

- Atomic Design で配置（`src/components/{atoms,molecules,organisms}/`）
- 色・フォントは `globals.css` の CSS 変数トークン経由で（hardcode 禁止、Tailwind の token utility を使う）
- microCMS / 外部フィードへのアクセスは `src/libs/` のヘルパー経由のみ
- `Inter` / `Roboto` 等は使わない
- 新規 reveal セクションには `data-reveal="content"` か `"hero"` を付ける

## 3. コミット

CLAUDE.md の `Conventions > Commits` に従う:

- **1行のみ**（本文なし、`Co-Authored-By` フッターなし）
- **英語 imperative mood**、〜72 文字
- 1コミット = 1論理変更
- ファイルは個別指定（`git add -A` / `git add .` は避ける）

```bash
git add <specific-files>
git commit -m "<title>"
```

例:

- `Add search bar to header`
- `Fix Hero gradient flicker on iOS Safari`
- `Refactor FeaturedCard image handling`

## 4. Push & PR 作成

```bash
git push -u origin <branch-name>
gh pr create --base develop
```

- **base は `develop`**。`main` は CLAUDE.md の Branching セクション通り、ユーザーから明示指示があった時のみ
- `.github/PULL_REQUEST_TEMPLATE.md` が自動適用される（日本語）
- 本文は `## 概要` / `## 作業ブランチ` / `## 目的` / `## 作業内容` を埋める
- 関連 Issue がある場合は `Closes #N` をどこかに入れる
- タイトルは英語 imperative mood（コミットタイトルと同じ流儀）

ヒアドキュメント例:

```bash
gh pr create --base develop --title "<English imperative title>" --body "$(cat <<'EOF'
## 概要

<このPRで何をしたか>

## 作業ブランチ

<branch-name>

## 目的
- <なぜやるのか>

## 作業内容
- [x] <完了した作業>
EOF
)"
```

## 5. 報告

ユーザーに以下を伝える:

- PR の URL
- ブランチ名と base ブランチ
- draft かどうか

## 禁止事項

- `--no-verify` / `--no-gpg-sign` で hook をスキップしない
- `git reset --hard` `git push --force` 等の破壊的操作はユーザーに確認なく実行しない
- `main` ブランチへの直接 push / PR は明示指示がない限り作らない

## UI 変更時の補足

UI/CSS の変更が含まれる場合、PR 本文の `## 概要` 直下にスクリーンショット欄を追加してユーザーに撮影を促す:

```markdown
## スクリーンショット
<!-- Before / After を貼る -->
```
