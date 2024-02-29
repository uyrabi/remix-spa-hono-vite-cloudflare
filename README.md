# Usage

```
bun run dev
bun run dev:down
bun run build
bun run deploy

## or

make dev
make down
make build
make deploy
```

https://zenn.dev/yusukebe/articles/c86b8bd8d47a53

# 推奨拡張機能

- Biome
- Error Lens
- Pretty TypeScript Errors

# 実装方針

## 型を解決できない場合

- any は使わない
- As で解決しコメントを残す

## TSDoc/TypeDoc

https://ja.wikibooks.org/wiki/TSDoc
https://typedoc.org/guides/overview/

# ディレクトリ

## client

- クライアントサイド(Remix SPA)

### routes

- Remix のコードを記述する

### shadcn

- shadcn/ui に関するものを置く
- 手動で編集しない

## functions

- サーバーサイド(hono rpc)

### [[route]].ts

- エントリーポイント
- ミドルウェアのインポート
- API のインポート

### api

- ルーティングとハンドラー（処理部分）、zod によるバリデーションを記述する
- zod-openapi を利用する
- クライアントからは hono rpc 経由で利用する

### middlewares

- ミドルウェアを記述する

## models

- モデル(drizzle)
- クライアント、サーバーどちらでも使用する

### モデル毎のファイル

#### index.ts

- 後述のファイルをまとめる用

#### table.ts

- テーブル定義、drizzle-kit でのマイグレーションファイル
- types.ts での型定義の基になる

#### types.ts

- 型、バリデーションの定義
- table.ts を基に実装し DB との乖離が生じないようにする

#### repository.ts

- CRUD を伴うロジックを記述する
- DB 操作は必ず repository.ts を経由する（API に直書きしない）

#### service.ts

- CRUD を伴わないロジックを記述する

---

### db

- DB の設定など

## build

- 触らない

## public

- 触らない

# TODO

## ディレクトリ設計

- テスト
- 定数管理
- 共通処理のモジュール
- プロジェクト設定ファイル
- hygen テンプレート

## Biome

## husky

## hygen

## prism

## SafeTest

https://techfeed.io/entries/65cc0f0f7036d02cdfb92e6b

## playwright/msw

## dredd

## JSDoc / TypeDoc

## bun test

## Github CI/CD

## AWS deploy

## OWASP ZAP

## ビット SQL

## AdminJS

- https://github.com/makuko/adminjs-drizzle

## シリアライズ

## ts-rest

## ts-pattern

## SecureHeaders

## ReDoc

# MEMO

## remix-run with react@canary

- remix-run のバージョンをあげると react@canary 使えない

## wrangler.toml

```
vim ~/.config/.wrangler/config/default.toml
```
