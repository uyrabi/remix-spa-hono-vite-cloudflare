ALTER TABLE `user` ADD CONSTRAINT `user_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `user` ADD `username` varchar(16) DEFAULT 'default man' NOT NULL;