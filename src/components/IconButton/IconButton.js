import { Button } from './IconButton.styled';

export const IconButton = ({ children, variant, size }) => {
  return (
    <Button variant={variant} size={size}>
      {children}
    </Button>
  );
};
//sm =24
//md =36
//lg = 48
