import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { List, Spin } from 'antd';
import React from 'react';
import { queryClassList } from '@/services/class';
import CourseCard from './components/CourseCard';

const ClassList: React.FC = () => {
  const { data, loading, error } = useRequest(queryClassList);

  // 根据控制台日志，data 可能是数组或包含 data 属性的对象
  // 兼容两种情况
  const rawData = Array.isArray(data) ? data : (data?.data || []);

  const listData = rawData.map((item: any) => ({
    id: item.id,
    title: item.courseName, // 字段映射: courseName -> title
    instructor: item.instructor,
    startTime: item.startTime,
    endTime: item.endTime,
    coverImage: item.coverImage,
  }));

  console.log('Processed listData:', listData);

  return (
    <PageContainer>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <CourseCard {...item} />
            </List.Item>
          )}
        />
      )}
    </PageContainer>
  );
};

export default ClassList;

