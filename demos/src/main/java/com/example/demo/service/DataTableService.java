package com.example.demo.service;

import com.example.demo.entity.DataTable;
import com.example.demo.mapper.DataTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DataTableService {
    @Autowired
    private DataTableMapper dataTableMapper;

    public List<DataTable> listAll() {
        return dataTableMapper.selectAll();
    }
}
