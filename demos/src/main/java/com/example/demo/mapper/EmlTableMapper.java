package com.example.demo.mapper;

import com.example.demo.entity.EmlTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface EmlTableMapper {
    @Select("SELECT workflow_run_id, filename, timestamp, subject, `from`, `to`, date, ip, content, attachment, image FROM eml")
    List<EmlTable> selectAll();
}
