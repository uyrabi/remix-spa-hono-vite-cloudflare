.PHONY: sh_add db_update

sh_add:
	bunx --bun shadcn-ui@latest add ${name}

db_update:
	bun drizzle-kit push:mysql

down:
	pkill node

run_client:
	docker-compose up -d

run_server:
	docker-compose exec app bun run dev:server