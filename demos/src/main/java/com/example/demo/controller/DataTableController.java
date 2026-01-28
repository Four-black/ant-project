package com.example.demo.controller;

import com.example.demo.common.Result;
import com.example.demo.entity.DataTable;
import com.example.demo.service.DataTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/data-table")
public class DataTableController {
    @Autowired
    private DataTableService dataTableService;

    @GetMapping
    public Result list() {
        List<DataTable> dataList = dataTableService.listAll();
        return Result.success(dataList);
    }
}
