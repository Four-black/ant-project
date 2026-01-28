package com.example.demo.service;

import com.example.demo.entity.BlobTable;
import com.example.demo.mapper.BlobTableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlobTableService {
    @Autowired
    private BlobTableMapper blobTableMapper;

    public List<BlobTable> listAll() {
        return blobTableMapper.selectAll();
    }
}
