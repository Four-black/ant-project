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
-- 课程表
CREATE TABLE `course_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `course_name` varchar(100) NOT NULL COMMENT '课程名称',
  `instructor` varchar(50) NOT NULL COMMENT '授课教师',
  `start_time` date NOT NULL COMMENT '开始时间',
  `end_time` date NOT NULL COMMENT '结束时间',
  `cover_image` varchar(255) DEFAULT NULL COMMENT '课程封面图片URL',
  `duration` varchar(50) DEFAULT NULL COMMENT '课程时长',
  `description` text COMMENT '课程简介',
  `prerequisites` text COMMENT '预备知识',
  `experiment_count` int DEFAULT '0' COMMENT '课程包含实验数量',
  `reference_materials` text COMMENT '参考资料',
  `extra_field1` varchar(255) DEFAULT NULL COMMENT '备用字段1',
  `extra_field2` varchar(255) DEFAULT NULL COMMENT '备用字段2',
  `extra_field3` varchar(255) DEFAULT NULL COMMENT '备用字段3',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程信息表';