package com.example.demo.util;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
/*import org.springframework.boot.context.properties.ConfigurationProperties;*/
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.common.auth.DefaultCredentialProvider;
import com.aliyun.oss.common.auth.CredentialsProvider;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class FileUtil {
    // 修正：使用 aliyun.oss 前缀，与配置文件匹配
    @Value("${aliyun.oss.endpoint}") // 对应配置中的 aliyun.oss.endpoint
    private String endpoint;

    @Value("${aliyun.oss.access-key-id}") // 对应 aliyun.oss.access-key-id（注意横线分隔）
    private String accessKeyId;

    @Value("${aliyun.oss.access-key-secret}") // 对应 aliyun.oss.access-key-secret
    private String accessKeySecret;

    @Value("${aliyun.oss.bucket-name}") // 对应 aliyun.oss.bucket-name
    private String bucketName;

    // 文件上传方法
    public String upload(MultipartFile file) {
        CredentialsProvider credentialsProvider = new DefaultCredentialProvider(accessKeyId, accessKeySecret);
        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, credentialsProvider);
        // 获取上传文件的输入流
        InputStream inputStream = null;
        try {
            inputStream = file.getInputStream();
            // 避免文件覆盖，使用当前时间作为文件夹，并设置UUID作为文件名
            String originalName = file.getOriginalFilename();
            String fileExtension = "";

            // 提取文件后缀名
            if (originalName != null && originalName.lastIndexOf(".") > 0) {
                fileExtension = originalName.substring(originalName.lastIndexOf("."));
            }

            // 生成新文件名：日期目录/UUID.扩展名
            String fileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + "/"
                    + UUID.randomUUID() + fileExtension;
            // 正式上传文件
            ossClient.putObject(bucketName, fileName, inputStream);
            // 文件访问路径
            String url = "https://" + bucketName + "." + endpoint.split("//")[1] + "/" + fileName;
            return url;
        } catch (IOException e) {
            log.error("文件上传失败=======>" + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

    }
}
