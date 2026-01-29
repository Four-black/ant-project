package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 课程章节实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("chapters")
public class Chapter {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 章节标题 */
    private String title;

    /** 学习目标 */
    private String objectives;

    /** 章节顺序 */
    private Integer chapterOrder;

    /** 所属课程ID */
    private Long courseId;

    /** 创建时间 */
    private LocalDateTime createdAt;

    /** 更新时间 */
    private LocalDateTime updatedAt;

    /** 章节知识点列表（不映射到数据库） */
    @TableField(exist = false)
    private List<ChapterContent> contents;
}
