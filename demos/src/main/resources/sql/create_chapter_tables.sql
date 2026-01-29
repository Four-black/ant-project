-- 章节表
CREATE TABLE IF NOT EXISTS `chapters` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  `title` VARCHAR(200) NOT NULL COMMENT '章节标题',
  `objectives` TEXT COMMENT '学习目标',
  `chapter_order` INT NOT NULL COMMENT '章节顺序',
  `course_id` BIGINT COMMENT '所属课程ID',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_course_id` (`course_id`),
  INDEX `idx_chapter_order` (`chapter_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程章节表';

-- 章节知识点表
CREATE TABLE IF NOT EXISTS `chapter_contents` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
  `chapter_id` BIGINT NOT NULL COMMENT '所属章节ID',
  `content_text` VARCHAR(500) NOT NULL COMMENT '知识点内容',
  `content_order` INT NOT NULL COMMENT '知识点顺序',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE CASCADE,
  INDEX `idx_chapter_id` (`chapter_id`),
  INDEX `idx_content_order` (`content_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='章节知识点表';
