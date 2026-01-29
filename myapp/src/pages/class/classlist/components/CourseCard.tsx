import { Card } from 'antd';
import React from 'react';
import { history } from '@umijs/max';
import useStyles from './CourseCard.style';

export interface CourseCardProps {
  id: number;
  title: string;
  university?: string;
  instructor: string;
  startTime: string;
  endTime: string;
  coverImage: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  startTime,
  endTime,
  coverImage,
}) => {
  const { styles } = useStyles();

  const handleClick = () => {
    history.push(`/class/specifcs?id=${id}`);
  };

  return (
    <Card
      hoverable
      className={styles.card}
      cover={<img alt={title} src={coverImage} />}
      onClick={handleClick}
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
