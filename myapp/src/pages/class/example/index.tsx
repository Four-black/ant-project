import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Input, Space, theme, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface ContentItem {
  id: number;
  text: string;
}

interface Chapter {
  id: number;
  title: string;
  objectives: string;
  contents: ContentItem[];
}

const Example: React.FC = () => {
  const { token } = theme.useToken();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      const url = newFileList[0].response?.data?.file_url;
      if (url) {
        message.success('图片上传成功，URL已获取');
        console.log('上传成功的URL:', url);
      }
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // 添加新章节
  const addChapter = () => {
    const newId = chapters.length > 0 ? Math.max(...chapters.map((c) => c.id)) + 1 : 1;
    setChapters([
      ...chapters,
      {
        id: newId,
        title: `第${newId}章 新章节`,
        objectives: '',
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
    setChapters(newChapters);
  };

  // 下移章节
  const moveDown = (index: number) => {
    if (index === chapters.length - 1) return;
    const newChapters = [...chapters];
    [newChapters[index], newChapters[index + 1]] = [newChapters[index + 1], newChapters[index]];
    setChapters(newChapters);
  };

  // 更新章节字段
  const updateChapter = (id: number, field: 'title' | 'objectives', value: string) => {
    setChapters(chapters.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // 添加知识点
  const addContentItem = (chapterId: number) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          const newItemId =
            c.contents.length > 0 ? Math.max(...c.contents.map((item) => item.id)) + 1 : 1;
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

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="封面上传测试">
          <ImgCrop rotationSlider aspect={16 / 9}>
            <Upload
              action="http://localhost:8080/file/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传封面</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
          {fileList.length > 0 && fileList[0].status === 'done' && (
            <div style={{ marginTop: 16 }}>
              <strong>后端返回的 URL：</strong>
              <div style={{ color: '#1890ff', wordBreak: 'break-all' }}>
                {fileList[0].response?.data?.file_url}
              </div>
            </div>
          )}
        </Card>

        {chapters.map((chapter, index) => (
          <Card key={chapter.id} style={{ borderLeft: `3px solid ${token.colorPrimary}` }}>
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
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: chapter.objectives ? '#fff' : 'transparent',
                  }}
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
    </PageContainer>
  );
};

export default Example;
