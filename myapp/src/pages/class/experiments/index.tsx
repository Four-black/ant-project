import { PageContainer } from '@ant-design/pro-components';
import { Card, Collapse, Empty, Spin, Typography, Space, Divider, List, Button } from 'antd';
import {
  PlayCircleFilled,
  ProfileOutlined,
  FileTextOutlined,
  DownOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';

const { Panel } = Collapse;
const { Title, Text, Paragraph } = Typography;

interface ChapterContent {
  id: number;
  contentText: string;
  contentOrder: number;
  contentType?: 'video' | 'practice' | 'document'; // 扩展类型以匹配图标
}

interface Chapter {
  id: number;
  title: string;
  objectives: string;
  chapterOrder: number;
  contents: ChapterContent[];
}

interface CourseInfo {
  id: number;
  courseName: string;
  instructor: string;
  description: string;
}

interface CourseDetail {
  courseInfo: CourseInfo;
  chapters: Chapter[];
}

const Experiments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [loading, setLoading] = useState(true);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    } else {
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourseDetail = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/courseInfo/get/${id}`);
      const result = await response.json();

      if (result.code === '200' || result.code === 200) {
        setCourseDetail(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch course detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!courseId) {
    return (
      <PageContainer>
        <Card>
          <Empty description="请从课程列表选择一门课程" />
        </Card>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!courseDetail) {
    return (
      <PageContainer>
        <Card>
          <Empty description="未找到课程信息" />
        </Card>
      </PageContainer>
    );
  }

  const renderContentIcon = (content: ChapterContent) => {
    // 默认使用蓝色圆形代码图标
    return (
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: '#1890ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CodeOutlined style={{ color: '#fff', fontSize: 18 }} />
      </div>
    );
  };

  return (
    <PageContainer
      title={courseDetail.courseInfo.courseName}
      breadcrumb={{}}
      header={{
        style: { background: '#fff', padding: '16px 24px' }
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {courseDetail.chapters && courseDetail.chapters.length > 0 ? (
          <Collapse
            defaultActiveKey={['1']}
            ghost
            expandIconPosition="end"
            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} style={{ fontSize: 16, color: '#1890ff' }} />}
          >
            {courseDetail.chapters.map((chapter, index) => (
              <Panel
                header={
                  <Title level={4} style={{ margin: 0, color: '#334d84', fontSize: 20 }}>
                    {chapter.title}
                  </Title>
                }
                key={String(index + 1)}
                style={{
                  marginBottom: 16,
                  background: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ padding: '0 24px 24px 24px' }}>
                  {chapter.objectives && (
                    <Paragraph style={{ color: '#333', fontSize: 16, marginBottom: 24 }}>
                      {chapter.objectives}
                    </Paragraph>
                  )}

                  <List
                    itemLayout="horizontal"
                    dataSource={chapter.contents.sort((a, b) => a.contentOrder - b.contentOrder)}
                    split={false}
                    renderItem={(content, idx) => (
                      <List.Item
                        style={{ padding: '12px 16px', border: 'none', cursor: 'pointer', borderRadius: 4, transition: 'all 0.3s' }}
                        className="hover-item"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <div style={{ marginRight: 16 }}>
                            {renderContentIcon(content)}
                          </div>
                          <Text style={{ fontSize: 16, color: '#333' }}>
                            {chapter.chapterOrder || (index + 1)}-{content.contentOrder || (idx + 1)} {content.contentText}
                          </Text>
                          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            {content.contentText.includes('练习') && (
                              <Text type="secondary" style={{ marginRight: 16 }}>实验数 1</Text>
                            )}
                            <Button
                              type="primary"
                              className="start-learning-btn"
                              style={{
                                borderRadius: 4,
                                height: 32,
                                fontSize: 14,
                                padding: '0 16px',
                                display: 'none' // 默认隐藏
                              }}
                            >
                              开始学习
                            </Button>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Card>
            <Empty description="暂无章节内容" />
          </Card>
        )}
      </div>
      <style>{`
        .ant-collapse-header {
          padding: 20px 24px !important;
          background-color: #f8faff;
        }
        .hover-item:hover {
          background-color: #f0f5ff;
        }
        .hover-item:hover .start-learning-btn {
          display: block !important;
        }
      `}</style>
    </PageContainer>
  );
};

export default Experiments;
