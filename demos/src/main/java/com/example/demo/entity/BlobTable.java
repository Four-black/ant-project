package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("`blob`")
public class BlobTable {
    private String workflowRunId;
    private byte[] eml;
    private byte[] attachment;
    private byte[] image;

    public String getWorkflowRunId() {
        return workflowRunId;
    }

    public void setWorkflowRunId(String workflowRunId) {
        this.workflowRunId = workflowRunId;
    }

    public byte[] getEml() {
        return eml;
    }

    public void setEml(byte[] eml) {
        this.eml = eml;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
