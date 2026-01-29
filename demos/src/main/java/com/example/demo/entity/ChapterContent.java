package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 章节知识点实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("chapter_contents")
public class ChapterContent {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 所属章节ID */
    private Long chapterId;

    /** 知识点内容 */
    private String contentText;

    /** 知识点顺序 */
    private Integer contentOrder;

    /** 创建时间 */
    private LocalDateTime createdAt;

    /** 更新时间 */
    private LocalDateTime updatedAt;
}
