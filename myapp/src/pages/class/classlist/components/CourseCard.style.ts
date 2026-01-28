import { createStyles } from 'antd-style';

export default createStyles(({ token }) => {
  return {
    card: {
      borderRadius: '8px',
      overflow: 'hidden',
      height: '100%',
      '&:hover': {
        boxShadow: token.boxShadowSecondary,
      },
      '.ant-card-cover img': {
        height: '160px',
        objectFit: 'cover',
      },
      '.ant-card-body': {
        padding: '12px 16px',
      },
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: token.colorTextHeading,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      '&:hover': {
        color: token.colorPrimary,
      },
    },
    infoText: {
      color: token.colorTextSecondary,
      fontSize: '14px',
      marginBottom: '2px',
    },
    timeText: {
      color: '#999',
      fontSize: '12px',
      marginTop: '8px',
    },
  };
});
