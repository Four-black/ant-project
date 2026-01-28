package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("data")
public class DataTable {
    private String workflowRunId;
    private String query;
    private String task;
    private String password;
    private String attAnal;
    private String attRpt;
    private String reply;
    private Byte label;
    private Byte score;
    private String sandboxRpt;

    public String getWorkflowRunId() {
        return workflowRunId;
    }

    public void setWorkflowRunId(String workflowRunId) {
        this.workflowRunId = workflowRunId;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAttAnal() {
        return attAnal;
    }

    public void setAttAnal(String attAnal) {
        this.attAnal = attAnal;
    }

    public String getAttRpt() {
        return attRpt;
    }

    public void setAttRpt(String attRpt) {
        this.attRpt = attRpt;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public Byte getLabel() {
        return label;
    }

    public void setLabel(Byte label) {
        this.label = label;
    }

    public Byte getScore() {
        return score;
    }

    public void setScore(Byte score) {
        this.score = score;
    }

    public String getSandboxRpt() {
        return sandboxRpt;
    }

    public void setSandboxRpt(String sandboxRpt) {
        this.sandboxRpt = sandboxRpt;
    }
}
