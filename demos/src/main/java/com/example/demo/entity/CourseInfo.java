package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 课程信息实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("course_info")
public class CourseInfo {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 课程名称 */
    private String courseName;

    /** 授课教师 */
    private String instructor;

    /** 开始时间 */
    private LocalDate startTime;

    /** 结束时间 */
    private LocalDate endTime;

    /** 课程封面图片URL */
    private String coverImage;

    /** 课程时长 */
    private String duration;

    /** 课程简介 */
    private String description;

    /** 预备知识 */
    private String prerequisites;

    /** 课程包含实验数量 */
    private Integer experimentCount;

    /** 参考资料 */
    private String referenceMaterials;

    /** 备用字段1 */
    private String extraField1;

    /** 备用字段2 */
    private String extraField2;

    /** 备用字段3 */
    private String extraField3;

    /** 创建时间 */
    private LocalDateTime createTime;

    /** 更新时间 */
    private LocalDateTime updateTime;
}
