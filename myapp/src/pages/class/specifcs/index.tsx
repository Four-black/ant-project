import {
  AppstoreOutlined,
  BulbOutlined,
  ShareAltOutlined,
  WechatOutlined,
  WeiboOutlined,
  QqOutlined,
  DownOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
  Tabs,
  Dropdown,
  message,
  Spin,
  Empty
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams, history } from '@umijs/max';
import { getCourseDetail } from '@/services/class';

const { Title, Paragraph, Text } = Typography;

const Specifcs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id');

  const [loading, setLoading] = useState<boolean>(true);
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) {
        message.error('课程ID不能为空');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await getCourseDetail(courseId);
        if (res && (res.code === 200 || res.code === '200')) {
          setCourseData(res.data);
        } else {
          message.error(res.msg || '获取推荐数据失败');
        }
      } catch (error) {
        console.error('Fetch course detail error:', error);
        message.error('网络请求失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return (
      <PageContainer title={false}>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" tip="正在加载课程详情..." />
        </div>
      </PageContainer>
    );
  }

  if (!courseData || !courseData.courseInfo) {
    return (
      <PageContainer title={false}>
        <Card>
          <Empty description="未找到相关课程信息" />
        </Card>
      </PageContainer>
    );
  }

  const { courseInfo, chapters } = courseData;

  const shareMenu = {
    items: [
      { key: 'wechat', label: '微信', icon: <WechatOutlined style={{ color: '#52c41a' }} /> },
      { key: 'weibo', label: '微博', icon: <WeiboOutlined style={{ color: '#f5222d' }} /> },
      { key: 'qq', label: 'QQ', icon: <QqOutlined style={{ color: '#1890ff' }} /> },
    ],
  };

  return (
    <PageContainer title={false}>
      {/* 顶部课程头信息区 */}
      <Card bordered={false} bodyStyle={{ padding: '24px 32px' }} style={{ marginBottom: 24 }}>
        {/* 标题和分享区域 - 移动到图片上方 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, fontSize: 28 }}>{courseInfo.courseName}</Title>
          <Space size="middle">
            <Text type="secondary">分享</Text>
            <WechatOutlined style={{ fontSize: 24, color: '#07C160', cursor: 'pointer' }} />
            <WeiboOutlined style={{ fontSize: 24, color: '#E6162D', cursor: 'pointer' }} />
            <QqOutlined style={{ fontSize: 24, color: '#1296DB', cursor: 'pointer' }} />
          </Space>
        </div>

        <Row gutter={32} align="top">
          {/* 左侧封面 */}
          <Col xs={24} md={10} lg={8}>
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              lineHeight: 0
            }}>
              <img
                src={courseInfo.coverImage || "https://img.alicdn.com/tfs/TB1.7E_SXXXXXXpXXXXXXXXXXXX-200-200.png"}
                alt="课程封面"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </Col>

          {/* 右侧详情 */}
          <Col xs={24} md={14} lg={16}>
            <Card style={{ backgroundColor: '#f8f9fa', border: 'none', borderRadius: 8 }}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Dropdown menu={{ items: [{ key: '1', label: '第1次开课' }] }}>
                    <Button type="text" style={{ padding: 0, fontSize: 16, fontWeight: 500 }}>
                      第1次开课 <DownOutlined style={{ fontSize: 12 }} />
                    </Button>
                  </Dropdown>
                </div>

                <Row gutter={[0, 12]}>
                  <Col span={24}>
                    <Space size={16}>
                      <Text type="secondary" style={{ fontSize: 14, width: 70, display: 'inline-block' }}>开课时间：</Text>
                      <Text style={{ fontSize: 14 }}>{courseInfo.startTime} ~ {courseInfo.endTime}</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space size={16}>
                      <Text type="secondary" style={{ fontSize: 14, width: 70, display: 'inline-block' }}>学时安排：</Text>
                      <Text style={{ fontSize: 14 }}>{courseInfo.duration || '0'} 学时</Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Space size={16}>
                      <Text type="secondary" style={{ fontSize: 14, width: 70, display: 'inline-block' }}>授课教师：</Text>
                      <Text style={{ fontSize: 14 }}>{courseInfo.instructor}</Text>
                    </Space>
                  </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <Text style={{ color: '#8c8c8c', fontSize: 14 }}>正在进行中</Text>
                  <Text style={{ color: '#8c8c8c', fontSize: 14 }}>
                    已有 <Text strong style={{ color: '#262626', fontSize: 16 }}>{courseInfo.experimentCount || 0}</Text> 份实验
                  </Text>
                </div>
              </Space>
            </Card>

            <Button
              type="primary"
              size="large"
              style={{
                marginTop: 24,
                height: 48,
                padding: '0 40px',
                fontSize: 18,
                backgroundColor: '#00C782',
                borderColor: '#00C782',
                borderRadius: 24,
                fontWeight: 'bold'
              }}
              onClick={() => {
                history.push(`/class/experiments?courseId=${courseId}`);
              }}
            >
              已参加，查看内容
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 下方内容主体 */}
      <Card bordered={false} bodyStyle={{ padding: '24px 40px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <AppstoreOutlined style={{ fontSize: 24, color: '#00C782', marginRight: 12 }} />
            <Title level={4} style={{ margin: 0 }}>课程概述</Title>
          </div>
          <Paragraph style={{ fontSize: 15, lineHeight: '1.8', color: '#666', whiteSpace: 'pre-wrap', paddingLeft: 36 }}>
            {courseInfo.description || '暂无课程描述'}
          </Paragraph>
        </div>

        {courseInfo.prerequisites && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <BulbOutlined style={{ fontSize: 24, color: '#00C782', marginRight: 12 }} />
              <Title level={4} style={{ margin: 0 }}>预备知识</Title>
            </div>
            <Paragraph style={{ fontSize: 15, color: '#666', paddingLeft: 36 }}>
              {courseInfo.prerequisites}
            </Paragraph>
          </div>
        )}

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <ReadOutlined style={{ fontSize: 24, color: '#00C782', marginRight: 12 }} />
            <Title level={4} style={{ margin: 0 }}>课程大纲</Title>
          </div>
          <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, marginLeft: 36 }}>
            {chapters && chapters.length > 0 ? (
              chapters.map((chapter: any, index: number) => (
                <div key={chapter.id} style={{
                  padding: '20px 24px',
                  borderBottom: index === chapters.length - 1 ? 'none' : '1px solid #f0f0f0'
                }}>
                  <Title level={5} style={{ marginBottom: 16 }}>
                    第{chapter.chapterOrder || (index + 1)}章：{chapter.title}
                  </Title>
                  {chapter.objectives && (
                    <div style={{ marginBottom: 12 }}>
                      <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>学习目标：{chapter.objectives}</Text>
                    </div>
                  )}
                  <div style={{ paddingLeft: 12 }}>
                    {chapter.contents && chapter.contents.length > 0 ? (
                      chapter.contents.map((content: any, cIndex: number) => (
                        <div key={content.id || cIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                          <Divider type="vertical" style={{ backgroundColor: '#00C782', height: 14, marginRight: 12 }} />
                          <Text style={{ color: '#666' }}>{content.contentText}</Text>
                        </div>
                      ))
                    ) : (
                      <Text type="secondary" italic>暂无知识点信息</Text>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <Empty description="暂无章节信息" />
              </div>
            )}
          </div>
        </div>

        {courseInfo.referenceMaterials && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <ReadOutlined style={{ fontSize: 24, color: '#00C782', marginRight: 12 }} />
              <Title level={4} style={{ margin: 0 }}>参考资料</Title>
            </div>
            <Paragraph style={{ fontSize: 15, color: '#666', paddingLeft: 36 }}>
              {courseInfo.referenceMaterials}
            </Paragraph>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Specifcs;

