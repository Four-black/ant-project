package com.example.demo.mapper;

import com.example.demo.entity.BlobTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface BlobTableMapper {
    @Select("SELECT workflow_run_id, eml, attachment, image FROM `blob`")
    List<BlobTable> selectAll();
}
