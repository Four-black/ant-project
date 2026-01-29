package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Chapter;
import com.example.demo.entity.ChapterContent;
import com.example.demo.mapper.ChapterContentMapper;
import com.example.demo.mapper.ChapterMapper;
import com.example.demo.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChapterServiceImpl extends ServiceImpl<ChapterMapper, Chapter> implements ChapterService {

    @Autowired
    private ChapterContentMapper contentMapper;

    @Override
    public List<Chapter> getChaptersByCourseId(Long courseId) {
        QueryWrapper<Chapter> wrapper = new QueryWrapper<>();
        wrapper.eq("course_id", courseId).orderByAsc("chapter_order");
        List<Chapter> chapters = this.list(wrapper);
        
        // 为每个章节加载知识点
        for (Chapter chapter : chapters) {
            QueryWrapper<ChapterContent> contentWrapper = new QueryWrapper<>();
            contentWrapper.eq("chapter_id", chapter.getId()).orderByAsc("content_order");
            List<ChapterContent> contents = contentMapper.selectList(contentWrapper);
            chapter.setContents(contents);
        }
        
        return chapters;
    }

    @Override
    @Transactional
    public void saveChapterWithContents(Chapter chapter) {
        // 设置时间
        if (chapter.getCreatedAt() == null) {
            chapter.setCreatedAt(LocalDateTime.now());
        }
        chapter.setUpdatedAt(LocalDateTime.now());
        
        // 保存章节
        this.save(chapter);
        Long chapterId = chapter.getId();
        
        // 保存知识点
        if (chapter.getContents() != null && !chapter.getContents().isEmpty()) {
            for (ChapterContent content : chapter.getContents()) {
                content.setChapterId(chapterId);
                if (content.getCreatedAt() == null) {
                    content.setCreatedAt(LocalDateTime.now());
                }
                content.setUpdatedAt(LocalDateTime.now());
                contentMapper.insert(content);
            }
        }
    }

    @Override
    @Transactional
    public void batchSaveChapters(Long courseId, List<Chapter> chapters) {
        if (chapters == null || chapters.isEmpty()) {
            return;
        }
        
        for (Chapter chapter : chapters) {
            chapter.setCourseId(courseId);
            saveChapterWithContents(chapter);
        }
    }
}
