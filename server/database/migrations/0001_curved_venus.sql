ALTER TABLE `product_images` MODIFY COLUMN `product_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category_id` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `product_images` ADD `display_order` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `is_available` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `is_featured` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `product_images_product_id_idx` ON `product_images` (`product_id`);