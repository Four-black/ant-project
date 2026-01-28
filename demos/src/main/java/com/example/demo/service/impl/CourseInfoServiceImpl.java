package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CourseInfo;
import com.example.demo.mapper.CourseInfoMapper;
import com.example.demo.service.CourseInfoService;
import org.springframework.stereotype.Service;

/**
 * 课程信息 Service 实现类
 */
@Service
public class CourseInfoServiceImpl extends ServiceImpl<CourseInfoMapper, CourseInfo> implements CourseInfoService {
}
