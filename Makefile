.PHONY: sh_add db_update

sh_add:
	bunx --bun shadcn-ui@latest add ${name}

db_update:
	bun drizzle-kit push:mysql

down:
	pkill node