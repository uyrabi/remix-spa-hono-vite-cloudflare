.PHONY: sh_add db_update

sh_add:
	bunx --bun shadcn-ui@latest add ${name}

db_update:
	bun drizzle-kit push:mysql

dev:
	bun run dev

down:
	bun run dev:down

build:
	bun run build

deploy:
	bun run deploy