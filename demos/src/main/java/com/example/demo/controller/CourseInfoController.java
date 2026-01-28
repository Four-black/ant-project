package com.example.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.demo.common.Result;
import com.example.demo.entity.CourseInfo;
import com.example.demo.service.CourseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 课程信息 控制层
 */
@RestController
@RequestMapping("/api/courseInfo")
public class CourseInfoController {

    @Autowired
    private CourseInfoService courseInfoService;

    /**
     * 新增课程
     */
    @PostMapping("/add")
    public Result add(@RequestBody CourseInfo courseInfo) {
        courseInfoService.save(courseInfo);
        return Result.success();
    }

    /**
     * 修改课程
     */
    @PutMapping("/update")
    public Result update(@RequestBody CourseInfo courseInfo) {
        courseInfoService.updateById(courseInfo);
        return Result.success();
    }

    /**
     * 删除课程
     */
    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Long id) {
        courseInfoService.removeById(id);
        return Result.success();
    }

    /**
     * 批量删除
     */
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Long> ids) {
        courseInfoService.removeByIds(ids);
        return Result.success();
    }

    /**
     * 根据ID查询
     */
    @GetMapping("/get/{id}")
    public Result getById(@PathVariable Long id) {
        CourseInfo courseInfo = courseInfoService.getById(id);
        return Result.success(courseInfo);
    }

    /**
     * 分页查询所有课程
     */
    @GetMapping("/page")
    public Result findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                           @RequestParam(defaultValue = "10") Integer pageSize,
                           @RequestParam(required = false) String courseName) {
        Page<CourseInfo> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<CourseInfo> queryWrapper = new LambdaQueryWrapper<>();
        if (courseName != null && !courseName.isEmpty()) {
            queryWrapper.like(CourseInfo::getCourseName, courseName);
        }
        queryWrapper.orderByDesc(CourseInfo::getCreateTime);
        return Result.success(courseInfoService.page(page, queryWrapper));
    }

    /**
     * 查询所有课程
     */
    @GetMapping("/all")
    public Result findAll() {
        return Result.success(courseInfoService.list());
    }
}
