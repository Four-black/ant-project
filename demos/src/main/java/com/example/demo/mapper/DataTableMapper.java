package com.example.demo.mapper;

import com.example.demo.entity.DataTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface DataTableMapper {
    @Select("SELECT workflow_run_id, query, task, password, att_anal, att_rpt, reply, label, score, sandbox_rpt FROM data")
    List<DataTable> selectAll();
}
