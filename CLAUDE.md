# CLAUDE.md

このファイルはこのリポジトリでコードを扱う Claude Code (claude.ai/code) へのガイドです。

## コマンド

```bash
npm run dev              # Next.js 開発サーバー (port 3000)
npm run build            # 本番ビルド
npm run start            # ビルド済みアプリの起動
npm run lint             # ESLint
npm run storybook        # Storybook (port 6006)
npm run build-storybook  # Storybook の静的ビルド
```

## アーキテクチャ

### スタック

Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4。パスエイリアス `@/*` → `./src/*`。

### 記事データのフロー

`Article` (`src/types/article.ts`) がアプリ全体で使う唯一の型。2つのソースから供給される:

- **microCMS**（自前の記事） — `src/libs/microcms.ts`。必須環境変数: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`。アイキャッチ画像は `images.microcms-assets.io` から配信（`next.config.ts` で許可済み）。
- **外部フィード** — `src/libs/external-api.ts` が Qiita と Zenn を集約（環境変数: `QIITA_USERNAME`, `ZENN_USERNAME`）。

`src/libs/transformers.ts` が両者を `Article` に正規化する。コンポーネントから直接 SDK や fetch を呼ばず、必ずこれらのヘルパー経由でアクセスする。

`src/libs/article-processor.ts` は microCMS の HTML を後処理し、`h1/h2/h3` に `id="heading-N"` を付与する（目次生成用）。

### コンポーネント層

`src/components/{atoms,molecules,organisms}/` の Atomic Design。各コンポーネントは独立したディレクトリに `.tsx` と Storybook story を持つ。上位層は下位層を組み合わせ、`src/app/` のページが organisms を組み合わせる。

### テーマ

色とタイポグラフィのトークンは `src/app/globals.css` の CSS 変数（`:root` がライト、`[data-theme="dark"]` がダーク）として定義され、Tailwind には `@theme inline` で公開している。色をハードコードせず、トークンユーティリティ（`bg-background`, `text-foreground`, `bg-card`, `text-muted`, `bg-tag-bg` など）を使う。`src/contexts/ThemeContext.tsx` が `<html>` の `data-theme` を切り替える。

フォントは Geist (sans) + Geist Mono + Noto Sans JP。`Inter` / `Roboto` / システムデフォルトフォントは使わない。

### ブートスクリーン / 段階リベール

`src/components/organisms/BootScreen` が `<html>` の `data-boot-phase` 属性で4段階のリベール処理を制御する（`globals.css` の概ね L84–134 を参照）:

- Phase 0: 初回描画前。すべて非表示、トランジションなし（FOUC 防止のため、インライン head スクリプトで最初の描画前にセット）
- Phase 1: header / footer が fade in
- Phase 2: 本文 (`[data-reveal="content"]`) が fade in
- Phase 3: hero (`[data-reveal="hero"]`) が最後に fade in

段階リベールに参加させたいセクションを追加する時は、ラッパーに `data-reveal="content"`（または `"hero"`）を付ける。

## 規約

### コミット

タイトル1行のみ・英語の命令形 (imperative mood)・〜72 文字・本文なし・`Co-Authored-By` フッターなし。履歴の例: `Add search bar to header`, `Fix Hero gradient flicker on iOS Safari`。1コミット = 1論理変更。`git add -A` ではなく対象ファイルを明示的に指定して stage する。

### ブランチ運用

Git Flow 風: `develop` が作業統合ブランチ、`main` はリリース用で **PR のデフォルト base ではない**。feature/fix ブランチは最新の `develop` から分岐し、PR は `develop` に戻す。`main` はリリース時に `develop` からのマージのみ受ける。

### PR / Issue

`.github/PULL_REQUEST_TEMPLATE.md` と `.github/ISSUE_TEMPLATE.md` は日本語。PR / Issue の **本文は日本語**で書く。PR タイトルは英語（コミット形式と統一）。PR の base はデフォルト `develop`。

### 環境変数

実際の値は `.env.local`（gitignore 済み）に置く。新しい変数を追加したら `.env.local.example` にも記載する。devcontainer は `runArgs --env-file` で `.env.local` を読み込む。

## Dev container

`.devcontainer/` は `node:24-trixie-slim` ベースで、GitHub CLI と Claude Code が事前インストールされている。`~/.claude` は永続ボリューム。プロジェクトスコープの skill (`frontend-design`, `doc-coauthoring`, `skill-creator`) は `.claude/skills/` 配下に配置され、gitignore 済み（`gh skill install` で再取得可能）。
