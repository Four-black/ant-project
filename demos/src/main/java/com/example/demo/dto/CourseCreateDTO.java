package com.example.demo.dto;

import com.example.demo.entity.Chapter;
import com.example.demo.entity.CourseInfo;
import lombok.Data;

import java.util.List;

/**
 * 课程创建请求DTO
 * 包含课程基本信息和章节列表
 */
@Data
public class CourseCreateDTO {
    
    /** 课程基本信息 */
    private CourseInfo courseInfo;
    
    /** 章节列表 */
    private List<Chapter> chapters;
}
