import { Card } from 'antd';
import React from 'react';
import useStyles from './CourseCard.style';

export interface CourseCardProps {
  title: string;
  university?: string;
  instructor: string;
  startTime: string;
  endTime: string;
  coverImage: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  startTime,
  endTime,
  coverImage,
}) => {
  const { styles } = useStyles();

  return (
    <Card
      hoverable
      className={styles.card}
      cover={<img alt={title} src={coverImage} />}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.infoText}>{instructor}</div>
      <div className={styles.timeText}>
        开课时间：{startTime} ~ {endTime}
      </div>
    </Card>
  );
};

export default CourseCard;
