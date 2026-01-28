package com.example.demo.service;

import com.example.demo.entity.EmlTable;
import com.example.demo.mapper.EmlTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmlTableService {
    @Autowired
    private EmlTableMapper emlTableMapper;

    public List<EmlTable> listAll() {
        return emlTableMapper.selectAll();
    }
}
