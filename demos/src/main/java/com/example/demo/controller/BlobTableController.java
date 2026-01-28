package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.BlobTable;
import com.example.demo.service.BlobTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/blob-table")
public class BlobTableController {
    @Autowired
    private BlobTableService blobTableService;

    @GetMapping
    public Result list() {
        List<BlobTable> blobList = blobTableService.listAll();
        return Result.success(blobList);
    }
}
