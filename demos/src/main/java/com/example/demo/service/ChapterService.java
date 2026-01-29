package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Chapter;

import java.util.List;

public interface ChapterService extends IService<Chapter> {
    /**
     * 根据课程ID查询章节及其内容
     */
    List<Chapter> getChaptersByCourseId(Long courseId);
    
    /**
     * 保存章节及其知识点
     */
    void saveChapterWithContents(Chapter chapter);
    
    /**
     * 批量保存章节
     */
    void batchSaveChapters(Long courseId, List<Chapter> chapters);
}
