CREATE TABLE `cronogramaActivities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`topicId` int NOT NULL,
	`activityName` varchar(255) NOT NULL,
	`startDate` varchar(10) NOT NULL,
	`durationDays` int NOT NULL,
	`dependencyId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cronogramaActivities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `okrs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`topicId` int NOT NULL,
	`krNumber` int NOT NULL,
	`description` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `okrs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `responsaveis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activityName` varchar(255) NOT NULL,
	`responsible` varchar(100) NOT NULL,
	`periodStart` varchar(10) NOT NULL,
	`periodEnd` varchar(10) NOT NULL,
	`status` enum('Em Progresso','Planejado','Concluído') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `responsaveis_id` PRIMARY KEY(`id`)
);
