package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.EmlTable;
import com.example.demo.service.EmlTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/eml-table")
public class EmlTableController {
    @Autowired
    private EmlTableService emlTableService;

    @GetMapping
    public Result list() {
        List<EmlTable> dataList = emlTableService.listAll();
        return Result.success(dataList);
    }
}
