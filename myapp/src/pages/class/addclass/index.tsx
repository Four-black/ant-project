import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormDatePicker, ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-components';
import { Button, Card, Input, Space, message, theme } from 'antd';
import React, { useState } from 'react';
import { history } from '@umijs/max';

const { TextArea } = Input;

interface ContentItem {
  id: number;
  text: string;
}

interface Chapter {
  id: number;
  title: string;
  objectives: string;
  chapterOrder: number;
  contents: ContentItem[];
}

const AddClass: React.FC = () => {
  const { token } = theme.useToken();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // 添加新章节
  const addChapter = () => {
    const newId = chapters.length > 0 ? Math.max(...chapters.map((c) => c.id)) + 1 : 1;
    setChapters([
      ...chapters,
      {
        id: newId,
        title: `第${newId}章 新章节`,
        objectives: '',
        chapterOrder: newId,
        contents: [],
      },
    ]);
  };

  // 删除章节
  const deleteChapter = (id: number) => {
    setChapters(chapters.filter((c) => c.id !== id));
  };

  // 上移章节
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newChapters = [...chapters];
    [newChapters[index - 1], newChapters[index]] = [newChapters[index], newChapters[index - 1]];
    // 更新序号
    newChapters.forEach((ch, idx) => {
      ch.chapterOrder = idx + 1;
    });
    setChapters(newChapters);
  };

  // 下移章节
  const moveDown = (index: number) => {
    if (index === chapters.length - 1) return;
    const newChapters = [...chapters];
    [newChapters[index], newChapters[index + 1]] = [newChapters[index + 1], newChapters[index]];
    // 更新序号
    newChapters.forEach((ch, idx) => {
      ch.chapterOrder = idx + 1;
    });
    setChapters(newChapters);
  };

  // 更新章节
  const updateChapter = (id: number, field: 'title' | 'objectives', value: string) => {
    setChapters(chapters.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // 添加知识点
  const addContentItem = (chapterId: number) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          const newItemId = c.contents.length > 0 ? Math.max(...c.contents.map((item) => item.id)) + 1 : 1;
          return {
            ...c,
            contents: [...c.contents, { id: newItemId, text: '' }],
          };
        }
        return c;
      }),
    );
  };

  // 更新知识点
  const updateContentItem = (chapterId: number, itemId: number, text: string) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          return {
            ...c,
            contents: c.contents.map((item) => (item.id === itemId ? { ...item, text } : item)),
          };
        }
        return c;
      }),
    );
  };

  // 删除知识点
  const deleteContentItem = (chapterId: number, itemId: number) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          return {
            ...c,
            contents: c.contents.filter((item) => item.id !== itemId),
          };
        }
        return c;
      }),
    );
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    if (submitting) {
      message.warning('正在提交，请稍候...');
      return;
    }

    try {
      setSubmitting(true);

      // 转换章节数据格式
      const formattedChapters = chapters.map((chapter, index) => ({
        title: chapter.title,
        objectives: chapter.objectives,
        chapterOrder: index + 1,
        contents: chapter.contents.map((item, itemIndex) => ({
          contentText: item.text,
          contentOrder: itemIndex + 1,
        })),
      }));

      const requestData = {
        courseInfo: {
          courseName: values.courseName,
          instructor: values.instructor,
          startTime: values.startTime,
          endTime: values.endTime,
          coverImage: values.coverImage || '',
          duration: values.duration,
          description: values.description,
          prerequisites: values.prerequisites,
          experimentCount: values.experimentCount || 0,
          referenceMaterials: values.referenceMaterials,
        },
        chapters: formattedChapters,
      };

      console.log('提交数据:', requestData);

      const response = await fetch('http://localhost:8080/api/courseInfo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('后端返回:', result);

      if (result.code === '200' || result.code === 200) {
        message.success('课程创建成功！');
        history.push('/class/classlist');
      } else {
        message.error('创建失败：' + (result.msg || '未知错误'));
      }
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交发生错误，请稍后再试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer title="创建新课程">
      <Card>
        <ProForm
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: '创建课程',
            },
            submitButtonProps: {
              loading: submitting,
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          {/* 课程基本信息 */}
          <Card type="inner" title="课程基本信息" style={{ marginBottom: 24 }}>
            <ProFormText
              name="courseName"
              label="课程名称"
              placeholder="请输入课程名称"
              rules={[{ required: true, message: '请输入课程名称' }]}
            />
            <ProFormText
              name="instructor"
              label="授课教师"
              placeholder="请输入教师姓名"
              rules={[{ required: true, message: '请输入授课教师' }]}
            />
            <ProFormDatePicker
              name="startTime"
              label="开始时间"
              rules={[{ required: true, message: '请选择开始时间' }]}
            />
            <ProFormDatePicker
              name="endTime"
              label="结束时间"
              rules={[{ required: true, message: '请选择结束时间' }]}
            />
            <ProFormText
              name="coverImage"
              label="课程封面图片URL"
              placeholder="请输入图片URL"
            />
            <ProFormText
              name="duration"
              label="课程时长"
              placeholder="例如：40学时"
            />
            <ProFormTextArea
              name="description"
              label="课程简介"
              placeholder="请输入课程简介"
              fieldProps={{ rows: 3 }}
            />
            <ProFormTextArea
              name="prerequisites"
              label="预备知识"
              placeholder="请输入学习本课程需要的预备知识"
              fieldProps={{ rows: 2 }}
            />
            <ProFormDigit
              name="experimentCount"
              label="实验数量"
              placeholder="请输入实验数量"
              min={0}
            />
            <ProFormTextArea
              name="referenceMaterials"
              label="参考资料"
              placeholder="请输入参考资料"
              fieldProps={{ rows: 2 }}
            />
          </Card>

          {/* 课程章节 */}
          <Card type="inner" title="课程章节">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {chapters.map((chapter, index) => (
                <Card key={chapter.id} size="small" style={{ borderLeft: `3px solid ${token.colorPrimary}` }}>
                  {/* 章节标题行 */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                    <span style={{ fontWeight: 'bold', marginRight: 16, minWidth: 30 }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)}
                      style={{ flex: 1, marginRight: 16 }}
                    />
                    <Space>
                      <Button type="primary" danger onClick={() => deleteChapter(chapter.id)}>
                        删除
                      </Button>
                      <Button type="primary" onClick={() => moveUp(index)}>
                        上移
                      </Button>
                      <Button type="primary" onClick={() => moveDown(index)}>
                        下移
                      </Button>
                    </Space>
                  </div>

                  {/* 学习目标 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                      <span style={{ color: '#999' }}>学习目标</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <TextArea
                        rows={4}
                        value={chapter.objectives}
                        onChange={(e) => updateChapter(chapter.id, 'objectives', e.target.value)}
                        style={{ position: 'relative', zIndex: 1, backgroundColor: chapter.objectives ? '#fff' : 'transparent' }}
                      />
                      {!chapter.objectives && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 12,
                            color: 'rgba(0, 0, 0, 0.25)',
                            pointerEvents: 'none',
                            zIndex: 0,
                            lineHeight: '1.6',
                          }}
                        >
                          <div>请输入该章节的学习目标。</div>
                          <div>让学生明白学完该章节后可获得的知识或技能，或者可达成的学习成果。</div>
                          <div>如："理解金融在社会经济发展中的作用"</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 章节内容 */}
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
                      <span style={{ color: '#999' }}>章节内容</span>
                    </div>
                    <Card size="small" style={{ backgroundColor: '#fafafa' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        {chapter.contents.map((item, itemIndex) => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ minWidth: 50, color: '#666' }}>
                              {index + 1}. {itemIndex + 1}
                            </span>
                            <Input
                              value={item.text}
                              onChange={(e) => updateContentItem(chapter.id, item.id, e.target.value)}
                              placeholder="请输入知识点内容"
                              style={{ flex: 1 }}
                            />
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => deleteContentItem(chapter.id, item.id)}
                            />
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() => addContentItem(chapter.id)}
                        >
                          添加知识点
                        </Button>
                      </Space>
                    </Card>
                  </div>
                </Card>
              ))}

              <Button type="dashed" block onClick={addChapter} style={{ height: 50 }}>
                + 添加新章节
              </Button>
            </Space>
          </Card>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default AddClass;
