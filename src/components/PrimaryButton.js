import { Button, makeStyles } from '@material-ui/core';

const PrimaryButton = ({ children, ...props }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const styles = useStyles();
  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
