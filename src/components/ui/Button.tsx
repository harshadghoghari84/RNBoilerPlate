import React from 'react';
import {
  Button as RNEButton,
  ButtonProps as RNEButtonProps,
  Icon,
  makeStyles,
  useTheme,
} from '@rneui/themed';

interface ButtonProps extends RNEButtonProps {
  variant?: 'primary' | 'secondary';
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { theme } = useTheme();
  const {
    variant = 'secondary',
    iconColor,
    buttonStyle,
    titleStyle,
    containerStyle,
    iconName,
    iconSize,
    type,
    ...otherProps
  } = props;
  const styles = useStyles(props);

  const icon = iconName ? (
    <Icon
      name={iconName}
      color={iconColor || theme.colors.lightgrey}
      size={iconSize || 18}
      style={styles.icon}
    />
  ) : undefined;

  return (
    <RNEButton
      type={type}
      containerStyle={[
        variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer,
        containerStyle,
      ]}
      buttonStyle={[
        variant === 'primary' ? styles.primary : styles.secondary,
        buttonStyle,
        type === 'outline' && variant === 'secondary' && styles.secondaryOutline,
      ]}
      titleStyle={[variant === 'primary' ? styles.primaryTitle : styles.secondaryTitle, titleStyle]}
      icon={icon}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    />
  );
};

const useStyles = makeStyles((theme, props: ButtonProps) => ({
  primaryContainer: {
    borderRadius: theme.borderRadii?.m,
  },
  secondaryContainer: {
    borderRadius: theme.borderRadii?.xl,
  },
  primary: {
    borderRadius: theme.borderRadii?.m,
  },
  secondary: {
    backgroundColor:
      props.type === 'outline' || props.type === 'clear' ? undefined : theme.colors?.secondary,
    borderRadius: theme.borderRadii?.xl,
    paddingVertical: theme.spacing?.s,
    paddingHorizontal: theme.spacing?.m,
  },
  primaryTitle: {
    fontFamily: theme.fontFamily?.semiBold,
    fontSize: 16,
  },
  secondaryTitle: {
    color: theme.colors?.buttonText,
    fontFamily: theme.fontFamily?.medium,
    fontSize: 14,
  },
  secondaryOutline: {
    borderColor: '#116a4f',
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 3,
  },
}));

export default Button;
