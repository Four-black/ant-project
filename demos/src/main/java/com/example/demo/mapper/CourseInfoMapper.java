package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.CourseInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * 课程信息 Mapper 接口
 */
@Mapper
public interface CourseInfoMapper extends BaseMapper<CourseInfo> {
}
