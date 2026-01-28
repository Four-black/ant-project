package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 课程信息表
 */
@Data
@TableName("course")
public class Course {

    /**
     * 课程ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 开课时间
     */
    private LocalDateTime startTime;

    /**
     * 课程时长（分钟）
     */
    private Integer durationMinutes;

    /**
     * 课程简介
     */
    private String courseIntro;

    /**
     * 预备知识
     */
    private String prerequisite;

    /**
     * 课程包含实验数量
     */
    private Integer experimentCount;

    /**
     * 参考资料
     */
    private String referenceMaterial;

    /**
     * 课程封面图片URL
     */
    private String coverImgUrl;

    /**
     * 扩展字段1
     */
    @com.baomidou.mybatisplus.annotation.TableField("ext_field_1")
    private String extField1;

    /**
     * 扩展字段2
     */
    @com.baomidou.mybatisplus.annotation.TableField("ext_field_2")
    private String extField2;

    /**
     * 扩展字段3
     */
    @com.baomidou.mybatisplus.annotation.TableField("ext_field_3")
    private String extField3;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
