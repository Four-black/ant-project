package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import com.example.demo.common.Result;
import com.example.demo.util.FileUtil;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/file")
@Tag(name = "文件上传下载", description = "文件上传下载接口")
public class FileController {

    @Autowired
    private FileUtil fileUtil;

    // 上传文件
    @Schema(description = "上传文件")
    @PostMapping("/upload")
    public Result upload(@RequestParam("file") MultipartFile file) {
        try {
            // 文件为空检查
            if (file.isEmpty()) {
                return Result.error("文件不能为空");
            }

            // 文件大小检查（虽然配置了全局限制，但这里可以给出更友好的提示）
            if (file.getSize() > 10 * 1024 * 1024) {
                return Result.error("文件大小不能超过10MB");
            }

            // 从文件名获取扩展名
            String fileName = file.getOriginalFilename();
            String extension = "";
            if (fileName != null && fileName.contains(".")) {
                extension = fileName.substring(fileName.lastIndexOf(".") + 1);
            }

            // 文件类型检查
            if (!isValidFileType(extension)) {
                return Result.error("不支持的文件类型: " + extension);
            }

            // 上传文件并获取URL
            String url = fileUtil.upload(file);
            String filename = file.getOriginalFilename();

            // 只返回文件信息，不调用 Dify API
            Map<String, Object> result = new HashMap<>();
            result.put("file_url", url);
            result.put("file_name", filename);
            return Result.success(result);

        } catch (Exception e) {
            return Result.error("文件上传失败：" + e.getMessage());
        }
    }

    // 新增分析接口，专门调用 Dify API
    @Schema(description = "分析文件（调用 Dify API）")
    @PostMapping("/analyze")
    public Result analyze(@RequestParam("file_url") String fileUrl,
            @RequestParam("file_name") String fileName,
            @RequestParam(value = "sandbox", required = false) String sandbox) {
        try {
            SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
            requestFactory.setConnectTimeout(60000);
            requestFactory.setReadTimeout(60000);
            RestTemplate restTemplate = new RestTemplate(requestFactory);
            String difyApi = "http://lab.minato4261.dpdns.org/v1/chat-messages";
            Map<String, Object> body = new HashMap<>();
            Map<String, Object> inputs = new HashMap<>();
            inputs.put("file_url", fileUrl);
            inputs.put("file_name", fileName);
            // 新增：获取 sandbox 参数（@RequestParam）
            if (sandbox != null && !sandbox.isEmpty()) {
                inputs.put("sandbox", sandbox);
            }
            body.put("inputs", inputs);
            body.put("query", "批量分析");
            body.put("response_mode", "streaming");
            body.put("conversation_id", "");
            body.put("user", "batch");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            headers.setBearerAuth("app-OCYPQJRjVQmlVV3VsgzbGsRo");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(difyApi, entity, String.class);
            return Result.success(response.getBody());
        } catch (Exception e) {
            return Result.error("分析失败：" + e.getMessage());
        }
    }

    // 文件类型验证
    private boolean isValidFileType(String extension) {
        if (extension == null || extension.trim().isEmpty()) {
            return false;
        }
        // 可以根据需求修改允许的文件类型
        List<String> allowedTypes = Arrays.asList(
                "exe", "doc", "docx", "pdf", "zip", "rar", "7z",
                "txt", "jpg", "jpeg", "png", "gif", "eml");
        return allowedTypes.contains(extension.toLowerCase());
    }
}