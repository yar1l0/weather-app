import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Alert 
      icon={<IconAlertCircle size={16} />}
      title="Error"
      color="red"
      mt={20}
      data-testid="error-message"
    >
      {message}
    </Alert>
  );
};

export default ErrorMessage;