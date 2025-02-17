import React from 'react';
import styled from 'styled-components';

import { Colors } from '../lib/foundations';
import { smallText } from './common-styles';

export enum SmallButtonColor {
  blue,
  red,
  green,
}

function getButtonColors(color?: SmallButtonColor, disabled?: boolean) {
  switch (color) {
    case SmallButtonColor.red:
      return {
        background: disabled ? Colors.red60 : Colors.red,
        backgroundHover: disabled ? Colors.red60 : Colors.red80,
      };
    case SmallButtonColor.green:
      return {
        background: disabled ? Colors.green40 : Colors.green,
        backgroundHover: disabled ? Colors.green40 : Colors.green90,
      };
    default:
      return {
        background: disabled ? Colors.blue50 : Colors.blue,
        backgroundHover: disabled ? Colors.blue50 : Colors.blue60,
      };
  }
}

const BUTTON_GROUP_GAP = 12;

interface StyledSmallButtonProps {
  $color?: SmallButtonColor;
  disabled?: boolean;
}

const StyledSmallButton = styled.button<StyledSmallButtonProps>(smallText, (props) => {
  const buttonColors = getButtonColors(props.$color, props.disabled);

  return {
    display: 'flex',
    minHeight: '32px',
    padding: '5px 16px',
    border: 'none',
    background: buttonColors.background,
    color: props.disabled ? Colors.white50 : Colors.white,
    borderRadius: '4px',
    marginLeft: `${BUTTON_GROUP_GAP}px`,
    alignItems: 'center',
    justifyContent: 'center',

    '&&:not(& + &&)': {
      marginLeft: '0px',
    },

    [`${SmallButtonGroupStart} &&`]: {
      marginLeft: 0,
      marginRight: `${BUTTON_GROUP_GAP}px`,
    },

    [`${SmallButtonGrid} &&`]: {
      flex: '1 0 auto',
      marginLeft: 0,
      minWidth: `calc(50% - ${BUTTON_GROUP_GAP / 2}px)`,
      maxWidth: '100%',
    },

    '&&:hover': {
      background: buttonColors.backgroundHover,
    },
  };
});

const StyledContent = styled.span({
  flex: '1 0 fit-content',
});

const StyledTextOffset = styled.span<{ $width: number }>((props) => ({
  display: 'flex',
  flex: `0 1 ${props.$width}px`,
}));

export interface MultiButtonCompatibleProps {
  className?: string;
  textOffset?: number;
}

interface SmallButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>,
    MultiButtonCompatibleProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: SmallButtonColor;
}

export function SmallButton(props: SmallButtonProps) {
  const { color, textOffset, children, ...otherProps } = props;
  return (
    <StyledSmallButton $color={props.color} {...otherProps}>
      {textOffset && textOffset > 0 ? <StyledTextOffset $width={Math.abs(textOffset)} /> : null}
      <StyledContent>{children}</StyledContent>
      {textOffset && textOffset < 0 ? <StyledTextOffset $width={Math.abs(textOffset)} /> : null}
    </StyledSmallButton>
  );
}

export const SmallButtonGroup = styled.div<{ $noMarginTop?: boolean }>((props) => ({
  display: 'flex',
  justifyContent: 'end',
  margin: '0 23px',
  marginTop: props.$noMarginTop ? 0 : '30px',
}));

export const SmallButtonGroupStart = styled(SmallButtonGroup)({
  flex: 1,
  justifyContent: 'start',
  margin: 0,
});

export const SmallButtonGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: `${BUTTON_GROUP_GAP}px`,
  rowGap: `${BUTTON_GROUP_GAP}px`,
});
