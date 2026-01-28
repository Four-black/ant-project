package com.example.demo.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

@RestController
@RequestMapping("/send")
public class SendController {

    @PostMapping("/chat-message")
    public ResponseEntity<String> sendChatMessage(@RequestBody Map<String, Object> params) {
        try {
            // 构造请求体
            Map<String, Object> body = new HashMap<>();
            body.put("inputs", new HashMap<>());
            body.put("query", "请分析是否是钓鱼邮件?");
            body.put("response_mode", "streaming");
            body.put("conversation_id", "");
            body.put("user", "abc-123");
            Map<String, Object> fileObj = new HashMap<>();
            fileObj.put("type", "custom");
            fileObj.put("transfer_method", "remote_url");
            fileObj.put("url", params.getOrDefault("url",
                    "https://fourbucke.oss-cn-beijing.aliyuncs.com/2025-09-23/74bfd5bf-19bc-4a7e-aade-06dfa0d6faef.eml"));
            fileObj.put("filename", params.getOrDefault("filename",
                    "00a05dcb791328d9e310cf790f52a3a9808159344d445653f641ebd143c64835.eml"));
            body.put("files", Arrays.asList(fileObj));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth("app-OCYPQJRjVQmlVV3VsgzbGsRo");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "http://lab.minato4261.dpdns.org/v1/chat-messages",
                    entity,
                    String.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("请求失败: " + e.getMessage());
        }
    }

    @PostMapping("/chat-message-batch")
    public ResponseEntity<String> sendChatMessageBatch(@RequestBody Map<String, Object> params) {
        try {
            // 构造请求体
            Map<String, Object> body = new HashMap<>();
            Map<String, Object> inputs = new HashMap<>();
            inputs.put("file_url", params.getOrDefault("file_url",
                    "https://fourbucke.oss-cn-beijing.aliyuncs.com/2025-09-23/74bfd5bf-19bc-4a7e-aade-06dfa0d6faef.eml"));
            inputs.put("file_name", params.getOrDefault("file_name",
                    "00a05dcb791328d9e310cf790f52a3a9808159344d445653f641ebd143c64835.eml"));
            body.put("inputs", inputs);
            body.put("query", "2");
            body.put("response_mode", "streaming");
            body.put("conversation_id", "");
            body.put("user", "batch");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth("app-OCYPQJRjVQmlVV3VsgzbGsRo");
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "http://lab.minato4261.dpdns.org/v1/chat-messages",
                    entity,
                    String.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("请求失败: " + e.getMessage());
        }
    }
}
