import React from "react";
import { styled } from "styled-components";
import { Colors } from "../../theme";
import Skeleton from "../Skeleton/Skeleton";
import LogoRound from "../Svg/Icons/LogoRound";
import Text from "../Text/Text";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
  chainId: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<React.PropsWithChildren<Props>> = ({
  cakePriceUsd,
  color = "textSubtle",
  showSkeleton = true,
  chainId,
}) => {
  return cakePriceUsd ? (
    <PriceLink
      href={`/swap?outputCurrency=0x228e2A0011662AE5A7176B279F590b2A58116DEF&chainId=${chainId}`}
      target="_blank"
    >
      <LogoRound width="24px" mr="8px" />
      <Text color={color} bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(CakePrice);
